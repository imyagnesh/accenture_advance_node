const { productModel, productValidation } = require("../models/productModel");

const addProduct = async (req, res) => {
  try {
    const { body } = req;
    const failRecords = [];
    const successRecords = [];
    const records = [];
    console.log("isArray", Array.isArray(body));
    if (Array.isArray(body)) {
      for (let i = 0; i < body.length; i++) {
        const element = body[i];
        const { error } = productValidation(element);
        console.log(error);
        if (error) {
          failRecords.push({
            data: element,
            reason: error.message,
          });
        } else {
          records.push(element);
        }
      }

      const result = await productModel.insertMany(records);

      const response = {};
      if (body.length === records.length) {
        response.status = "success";
        response.data = result;
      } else if (body.length === failRecords.length) {
        response.status = "failed";
        response.data = failRecords;
      } else {
        response.status = "partial";
        response.successRecords = result;
        response.failRecords = failRecords;
      }
      res.status(201).send(response);
    } else {
      const { error } = productValidation(body);
      if (error) res.status(400).send({ message: error.message });
      const product = new productModel(body);
      await product.save();
      res.status(201).send(product);
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    return res.status(200).send(products);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

module.exports = {
  addProduct,
  getProducts,
};
