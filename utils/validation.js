const joi = require("joi");

const registerSchema = joi.object({
  username: joi.string().min(2).max(30).required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
});

const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
});

module.exports = {
  registerSchema,
  loginSchema,
};






























