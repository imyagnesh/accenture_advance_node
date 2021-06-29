const express = require("express");
const router = express.Router();
const cartController = require("../controller/cartController");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");

router.post("/", [auth, admin], cartController.addToCart);

router.get("/", [auth], cartController.getCart);

module.exports = router;
