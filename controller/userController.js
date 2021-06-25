const { userSchema, validateUser, userModel } = require("../models/userModel");
const { passwordComplexity } = require("../utils");
const hash = require("../utils/hash");

const getUser = async (req, res) => {
  try {
    const users = await userModel.find({}, "-password");
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

    res.status(201).send(resData);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
  } catch (error) {}
};

const changePassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { error } = passwordComplexity.validate(password);

    if (error) return res.status(400).send({ message: error.message });

    const hashedPassword = await hash(password);

    const user = await userModel.updateOne(
      { email: email },
      {
        $set: {
          password: hashedPassword,
        },
      }
    );

    res.status(201).send({ message: "Password Change successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { _id } = req.user;
    await userModel.deleteOne({ _id });
    res.status(201).send({ message: "user deleted Successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getMe = async (req, res) => {
  try {
    const { _id } = req.user;
    const user = await userModel.findOne({ _id }, "-password");
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  addUser,
  getUser,
  getUserById,
  updateUser,
  deleteUser,
  changePassword,
  getMe,
};
