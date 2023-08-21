// import d'express
const express = require('express')

// création du Router
const router = express.Router()

const userctrl = require("../controllers/user")
const validpassword = require('../middleware/valid')


router.post("/signup",validpassword,userctrl.signup)

router.post("/login",userctrl.login)




// exporter le Routeur
module.exports = router