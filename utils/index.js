const passComplexity = require("joi-password-complexity");

const complexityOptions = {
  min: 10,
  max: 30,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 1,
  requirementCount: 2,
};

const passwordComplexity = passComplexity(complexityOptions);

module.exports = {
  passwordComplexity,
};
