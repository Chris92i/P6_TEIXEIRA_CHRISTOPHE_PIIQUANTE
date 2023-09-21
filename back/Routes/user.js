// import d'express
const express = require("express");

// création du Router
const router = express.Router();

const userctrl = require("../controllers/user");
const validpassword = require("../middleware/validpassword");
const validEmail = require("../middleware/validEmail");
const limitLogin = require("../middleware/limitLogin")

router.post("/signup", validpassword, validEmail, userctrl.signup);
router.post("/login", limitLogin, userctrl.login);

// exporter le Routeur
module.exports = router;
