const User = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


exports.signup = (req,res) =>{
    res.status(201).json({message:"utilisateur inscrit"})
} 

exports.login = (req,res) => {
    res.status(201).json({message:"utilisateur loguer"})
}

