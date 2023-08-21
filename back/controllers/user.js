// import du model user
const User = require("../models/user")

// import du pacquage bcrypt
const bcrypt = require("bcrypt")

const jwt = require("jsonwebtoken");
const user = require("../models/user");
const { use } = require("../app");
const valid = require("../middleware/valid");


exports.signup = (req,res) =>{  
    exports.signup = (req, res, next) => {
        //
        bcrypt.hash(req.body.password, 10)
          .then(hash => {
            const user = new User({
              email: req.body.email,
              password: hash
            });
            user.save()
              .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
              .catch(error => res.status(400).json({ error }));
          })
          .catch(error => res.status(500).json({ error }));
      };
} 

exports.login = (req,res) => {
  User.findOne({ email: req.body.email })
  .then(user => {
      if (!user) {
          return res.status(401).json({ message: 'Paire login/mot de passe incorrecte'});
      }
      // utilisation de la méthode compare de brcypt pour comparer le mdp que l'user vient d'entrer avec le hash dans la base (si vient de la même string)
      bcrypt.compare(req.body.password, user.password)
          .then(valid => {
              if (!valid) {
                  return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
              }
              res.status(200).json({
                  userId: user._id,
                  token: 'TOKEN'
              });
          })
          .catch(error => res.status(500).json({ error }));
  })
  .catch(error => res.status(500).json({ error }));
    
    //res.status(201).json({message:"utilisateur loguer"})
}

