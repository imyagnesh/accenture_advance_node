const jwt = require("jsonwebtoken");
const config = require("config");

const auth = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token)
    return res.status(401).send({ message: "you are not valid user" });

  try {
    const decode = jwt.verify(token, config.get("jwtKey"));
    console.log(decode);
    req.user = decode;

    next();
    // req.user = decoded;
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

module.exports = auth;
