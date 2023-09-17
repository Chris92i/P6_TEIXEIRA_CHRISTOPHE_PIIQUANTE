const { check } = require("express-validator");

module.exports = (req, res, next) => {
  const emailValidator = check('email')
  .isEmail()
  .isLength({min: 10, max: 230});
  next();
};
