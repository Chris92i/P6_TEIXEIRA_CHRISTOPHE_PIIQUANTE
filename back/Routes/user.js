const express = require('express')
const router = express.Router()
const userctrl = require("../controllers/user")
const validpassword = require('../middleware/valid')
router.post("/signup",validpassword,userctrl.signup)

router.post("/login",userctrl.login)





module.exports = router