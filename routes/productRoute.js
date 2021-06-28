const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");

router.post("/", [auth, admin], productController.addProduct);
router.get("/", productController.getProducts);

module.exports = router;
