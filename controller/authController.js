const { validateUserForCompare, userModel } = require("../models/userModel");
const hash = require("../utils/hash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");

const validateUser = async (req, res) => {
  try {
    const { body } = req;
    const { error } = validateUserForCompare(body);

    if (error) return res.status(400).send({ message: error.message });

    const user = await userModel.findOne({
      email: body.email,
    });

    if (!user)
      return res.status(400).send({ message: "invalid email address" });

    const isValidPassword = await bcrypt.compare(body.password, user.password);

    if (!isValidPassword)
      return res.status(400).send({ message: "Password is not valid" });

    const { password, ...resData } = user.toObject();

    console.log(config.get("jwtKey"));

    const token = jwt.sign(resData, config.get("jwtKey"), {
      expiresIn: "24h",
    });

    res.status(200).send({ token });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  validateUser,
};
