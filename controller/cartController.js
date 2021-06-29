var mongoose = require("mongoose");
var Fawn = require("fawn");
const { validateCart, cartModel } = require("../models/cartModel");
const { productModel } = require("../models/productModel");

Fawn.init(mongoose);
const task = Fawn.Task();

const addToCart = async (req, res) => {
  try {
    const { _id: userId } = req.user;

    const { productId, quantity, cartId } = req.body;

    const product = await productModel.findOne({ _id: productId });

    if (cartId) {
      if (quantity === 0) {
        task.remove("Cart", { _id: cartId });
      } else {
        task.update(
          "Cart",
          { _id: cartId },
          {
            $inc: {
              quantity: quantity,
            },
          }
        );
      }
    } else {
      const cartDetails = new cartModel({
        userId,
        productId,
        quantity,
        price: product.price,
      });
      task.save("Cart", cartDetails);
    }

    task.update(
      "Product",
      { _id: productId },
      {
        $inc: {
          quantity: quantity * -1,
        },
      }
    );

    let results = await task.run({ useMongoose: true });
    res.status(201).send(results);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getCart = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    const cartDetails = await cartModel.find({ userId });
    res.status(200).send(cartDetails);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = { addToCart, getCart };
