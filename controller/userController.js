const { userSchema, validateUser, userModel } = require("../models/userModel");
const hash = require("../utils/hash");

const getUser = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
  } catch (error) {}
};

const addUser = async (req, res) => {
  try {
    const { body } = req;
    const { error } = validateUser(body);

    if (error) return res.status(400).send({ message: error.message });

    const hashedPassword = await hash(body.password);

    const user = new userModel({
      ...body,
      password: hashedPassword,
    });

    await user.save();

    const { password, ...resData } = user.toObject();

    res.status(201).send({ token });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
  } catch (error) {}
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
  } catch (error) {}
};

module.exports = {
  addUser,
  getUser,
  getUserById,
  updateUser,
  deleteUser,
};
