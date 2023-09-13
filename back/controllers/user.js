// import du model user
const User = require("../models/user");

// import du pacquage bcrypt
const bcrypt = require("bcrypt");

// import du package jsonwebtoken pour les token pour la création des token
const jwt = require("jsonwebtoken");

const valid = require("../middleware/validpassword");

exports.signup = (req, res) => {
  //utilisation du plugin bcrypt et sa method hash on veut faire un hash 10 fois
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(432).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .json({ message: "Paire email/mot de passe incorrecte" });
      }
      // utilisation de la méthode compare de brcypt pour comparer le mdp que l'user vient d'entrer avec le hash dans la base (si vient de la même string)
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res
              .status(401)
              .json({ message: "Paire email/mot de passe incorrecte" });
          }
          res.status(200).json({
            userId: user._id,
            //utilisation de la fonction sign de jsonwebtoken pour le chiffrage d'un token
            token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
