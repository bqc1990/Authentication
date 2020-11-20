const Joi = require("joi");
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

module.exports = { validateSignIn, validateSignUp };
