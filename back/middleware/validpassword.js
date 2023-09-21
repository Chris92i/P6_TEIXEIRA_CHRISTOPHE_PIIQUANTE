const Validator = require('password-validator');

const val = new Validator()
val
.is()
    .min(8) // Minimum length 8
    .is()
    .max(20) // Maximum length 20
    .has()
    .uppercase() // Must have uppercase letters
    .has()
    .lowercase() // Must have lowercase letters
    .has()
    .digits(1) // Must have at least 1 digits
    .has()
    .not()
    .spaces(); // Should not have spaces
module.exports = (req, res, next) => {
    console.log("password is " + val.validate(req.body.password));
    if (val.validate(req.body.password)) {
        next();
    } else {
        return res.status(400).json({
            error: `le mot de passe n'est pas valide: ${val.validate(
                "req.body.password",
                { list: true }
            )}`,
        });
    }
};


