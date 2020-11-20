const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).json({ msg: "access denied." });
  const token_verfied = await jwt.verify(token, process.env.JWT_SECRET);
  if (!token_verfied) return res.status(401).json({ msg: "access denied." });
  req.user_id = token_verfied.id;
  next();
};

module.exports = auth;
