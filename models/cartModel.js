const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.ObjectId,
    ref: "User",
  },
  productId: {
    type: mongoose.ObjectId,
    ref: "Product",
  },
  quantity: {
    type: Number,
    default: 0,
    max: 10,
    min: 0,
  },
  price: {
    type: Number,
    default: 0,
  },
});

const validateCart = (cart) => {
  const schema = Joi.object({
    userId: Joi.objectId(),
    productId: Joi.objectId(),
    quantity: Joi.number(),
    price: Joi.number(),
  });
  return schema.validate(cart);
};

const cartModel = mongoose.model("Cart", cartSchema);

module.exports = {
  validateCart,
  cartModel,
};
