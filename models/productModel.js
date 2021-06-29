const mongoose = require("mongoose");
const Joi = require("joi");

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    max: 200,
    min: 3,
    required: true,
  },
  price: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
  },
  quantity: {
    type: Number,
    default: 0,
    min: 0,
  },
});

const productValidation = (product) => {
  const schema = Joi.object({
    productName: Joi.string().min(2).max(200).required(),
    price: Joi.number(),
    description: Joi.string(),
    quantity: Joi.number(),
  });
  return schema.validate(product);
};

const productModel = mongoose.model("Product", productSchema);

module.exports = {
  productModel,
  productValidation,
};
