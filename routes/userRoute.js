const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");

router.get("/", auth, userController.getUser);

router.get("/me", auth, userController.getMe);

router.get("/:id", userController.getUserById);

router.post("/", userController.addUser);

router.put("/:id", userController.updateUser);

router.post("/changePassword", auth, userController.changePassword);

router.delete("/", [auth, admin], userController.deleteUser);

module.exports = router;
