var mongoose = require("mongoose");
var Fawn = require("fawn");
const { validateCart, cartModel } = require("../models/cartModel");
const { productModel } = require("../models/productModel");

Fawn.init(mongoose);
// const task = Fawn.Task();

const addToCart = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    const { productId, quantity } = req.body;

    const product = await productModel.findOne({ _id: productId });

    if (product && product.quantity >= quantity) {
      console.log(product.quantity - quantity);
      await new Fawn.Task()
        .update(
          "Product",
          { _id: productId },
          {
            $set: { quantity: product.quantity - quantity },
          }
        )
        .save(
          "Cart",
          new cartModel({ userId, productId, quantity, price: product.price })
        )
        .run({ useMongoose: true });
      return res.status(201).send("successfully added into cart");
    } else {
      return res.status(400).send({ message: "product is not available" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = { addToCart };
