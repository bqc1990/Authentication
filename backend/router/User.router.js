const Router = require("express").Router();
const Bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/User.model");

//middleware to validate sign in/up basic inputs
const { validateSignUp, validateSignIn } = require("../middleware/validation");

const auth = require("../middleware/auth");

//sign up
Router.post("/sign-up", async (req, res) => {
  try {
    //validate input
    const { error } = validateSignUp(req.body);
    if (error) {
      return res.status(404).json({ msg: error.details[0].message });
    }
    //check if the user already existed in database
    const user_found = await User.findOne({ username: req.body.username });
    if (user_found) {
      return res.status(400).json({ msg: "user already exist." });
    }

    //hash password
    const salt = await Bcrypt.genSalt();
    const password_hash = await Bcrypt.hash(req.body.password, salt);

    //create user object and save it into the database
    const newUser = new User({
      username: req.body.username,
      password: password_hash,
      name: req.body.name ? req.body.name : "Valued Customer",
    });
    const user_saved = await newUser.save();
    //
    res.json(user_saved);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

//sign in
Router.post("/sign-in", async (req, res) => {
  try {
    //validate input
    const { error } = validateSignIn(req.body);
    if (error) {
      return res.status(404).json({ msg: error.details[0].message });
    }

    //check if the user is in the database
    const user_found = await User.findOne({ username: req.body.username });
    if (!user_found) {
      return res.status(400).json({ msg: "invalidate credentials." });
    }

    //compare password
    const isMatch = await Bcrypt.compare(
      req.body.password,
      user_found.password
    );
    if (!isMatch) {
      return res.status(400).json({ msg: " invalidate credentials." });
    }

    //generate webtoken to the user
    const token = jwt.sign({ id: user_found._id }, process.env.JWT_SECRET);
    res.json({
      token: token,
      user: {
        id: user_found._id,
        name: user_found.name,
        email: user_found.username,
      },
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

//delete the login user
Router.delete("/delete", auth, async (req, res) => {
  const user_delete = await User.findByIdAndDelete(req.user_id);
  res.json(user_delete);
});

//if token is validate
Router.post("/tokenIsValidate", async (req, res) => {
  try {
    const token = req.header("auth-token");

    if (!token) return res.json({ validate: false, user: null });
    const token_verfied = await jwt.verify(token, process.env.JWT_SECRET);
    if (!token_verfied) return res.json({ validate: false, user: null });
    const user_found = await User.findById(token_verfied.id);
    if (!user_found) return res.json({ validate: false, user: null });
    return res.json({
      validate: true,
      user: { name: user_found.name, user_id: user_found._id },
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

module.exports = Router;
