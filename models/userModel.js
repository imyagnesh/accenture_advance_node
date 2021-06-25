const mongoose = require("mongoose");
const Joi = require("joi");
const { passwordComplexity } = require("../utils");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 3,
    max: 255,
  },
  email: {
    type: String,
    required: true,
    min: 3,
    max: 255,
    unique: true,
  },
  password: {
    type: String,
    min: 8,
    max: 1024,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

const validateUser = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(255).required(),
    email: Joi.string()
      .min(3)
      .max(255)
      .required()
      .email()
      .label("email address"),
    password: passwordComplexity,
    isAdmin: Joi.boolean(),
  });

  return schema.validate(user);
};

const validateUserForCompare = (user) => {
  const schema = Joi.object({
    email: Joi.string().min(3).max(255).required().email(),
    password: passwordComplexity,
  });

  return schema.validate(user);
};
// 1 upper case
// 1 lower case
// 1 special character
// min 8 letter
// max 255 letter

const userModel = mongoose.model("User", userSchema);

// module.exports.userSchema = userSchema;
// module.exports.validateUser = validateUser;
// module.exports.userModel = userModel;

module.exports = {
  userSchema,
  validateUser,
  userModel,
  validateUserForCompare,
};
