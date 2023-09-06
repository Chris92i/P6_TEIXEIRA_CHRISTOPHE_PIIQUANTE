// import du model Sauce
const { json } = require("express");
const Sauce = require("../models/sauce");
const fs = require('fs');
const { error } = require("console");
const sauce = require("../models/sauce");


exports.createSauce = (req, res) => {
  const sauceObject = JSON.parse(req.body.sauce)
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
    userId: req.auth.userId
  });
  sauce
    .save()
    .then(() => {
      res.status(201).json({
        message: "Post saved successfully!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.getAllSauces = (req, res) => {
  Sauce.find()
    .then((sauce) => {
      res.status(200).json(sauce);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.getOneSauce = (req, res) => {
  Sauce.findOne({
    _id: req.params.id,
  })
    .then((sauce) => {
      if (!sauce) {
        return res.status(404).json({ message: "sauce non trouvée" });
      }
      res.status(200).json(sauce);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

exports.updateSauce = (req, res) => {
  const sauceObject = req.file? {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
        } : {
            ...req.body,
        };
  Sauce.findOne({ _id: req.params.id })
      .then((sauce) => {
          if (sauce.userId != req.auth.userId) {
              res.status(401).json({ message: "non autorisé" });
          } else {      
            //si on utilise le mot clé NEW avec un modèle Mangoose crée par défaut un champ _id
            //cela créerait une erreur car modification de champ immuable. =>  donc on utilise le parametre _id de la requete
            //pour configurer la sauce avec le meme _id qu'avant.     
              Sauce.updateOne(
                  { _id: req.params.id },
                  { ...sauceObject, _id: req.params.id }
              )
                  .then(() => {
                      res.status(201).json({
                          message: "Sauce updated successfully!",
                      });
                  })
                  .catch((error) => res.status(500).json({ error }));
          }
      })
      .catch((error) => {
          res.status(404).json({ error });
      });
};


exports.deleteSauce = (req,res) => {
  Sauce.findOne ({_id : req.params.id})
    .then(sauce => {
      if (sauce.userId != req.auth.userId) {
        res.status(401).json({message: 'Not authorized'});
      }else{
        const filename = sauce.imageUrl.split('/images')[1];
        fs.unlink('images/${filename}', () => {
          Sauce.deleteOne({_id: req.params.id})
            .then(()=> {
              res.status(200).json({message: 'Objet supprimé !'})
            })
            .catch(error => res.status(401).json({error}));
        })
      }
     }
    )
    .catch( error => {
      res.status(500).json({ error });
    });
}

/* //ancienne fonction sans delete de l'image
exports.deleteSauce = (req, res) => {
  Sauce.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({
        message: "Deleted!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};
*/


exports.likeSauce = (req, res) => {
  res.status(200).json({ message: "ok" });
};
