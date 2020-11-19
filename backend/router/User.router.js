const Router = require("express").Router();
const Joi = require("joi");
const Bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/User.model");

const validateSignUp = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(5).required(),
    password: Joi.string().min(6).required(),
    repeat_password: Joi.ref("password"),
    name: Joi.string(),
  });
  return schema.validate({
    username: data.username,
    password: data.password,
    repeat_password: data.repeat_password,
  });
};
const validateSignIn = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(5).required(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate({
    username: data.username,
    password: data.password,
  });
};

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
      return res.status(400).json({ msg: "user not exist." });
    }

    //compare password
    const isMatch = await Bcrypt.compare(
      req.body.password,
      user_found.password
    );
    if (!isMatch) {
      return res.status(400).json({ msg: " username or password not match." });
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

module.exports = Router;
