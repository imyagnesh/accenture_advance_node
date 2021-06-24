const bcrypt = require("bcrypt");

const encryption = async (key) => {
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(key, salt);
  return hashed;
};

module.exports = encryption;
