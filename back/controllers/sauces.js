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


exports.likeSauce = (req, res) => {
  res.status(200).json({ message: "ok" });
};
//récupérer le parametre de la sauce qu'on cherche dans la requete (req.params.id) findOne
// est qu'on a un résultat 
// si on a un résultat => on fait un swith => pour tester le like 1,0, -1
// si c'est un CASE 1 = 1 vérifier s'il n'a pas déjà liker => vérifier dans le tableau userliked vérifier si (req.auth.userId) n'est pas dedans => si dedans (message déjà voté) 
// si pas dedans => on créer un petit objet {userLiked: req.auth.userId} faire un autre petit objet {likes: 1} => push $inc :{like : 1} $push : {userLiked: req.auth.userId}

//Case = -1 idem pour le -1 ce n'est pas $push mais $pull pour retirer $inc: {disLiked: -1}

//Case 3 = 0 regarder si déjà dans le tableau des likes (si oui le retirer) et sinon aller voir dans le tableau des dislikes et le retirer du tableau


// => puis faire un updateOne




