//import du modele sauce
const Sauce = require("../models/sauce");

//import du module fs (file system) de node pour pouvoir gerer les fichiers
const fs = require("fs");


exports.createSauce = (req, res) => {
  //on extrait la sauce du corps de la requete
  const sauceObject = JSON.parse(req.body.sauce);
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
    userId: req.auth.userId,
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
  //utilisation de la méthode find() de mangoose sans argument pour récupérer toute la collection
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
  const sauceObject = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : {
        ...req.body,
      };
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      if (sauce.userId != req.auth.userId) {
        res.status(401).json({ message: "non autorisé" });
      } else {
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

exports.deleteSauce = (req, res) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      if (sauce.userId != req.auth.userId) {
        res.status(401).json({ message: "Not authorized" });
      } else {
        const filename = sauce.imageUrl.split("/images")[1];
        fs.unlink(`images/${filename}`, () => {
          Sauce.deleteOne({ _id: req.params.id })
            .then(() => {
              res.status(200).json({ message: "Objet supprimé !" });
            })
            .catch((error) => res.status(401).json({ error }));
        });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};



exports.likeSauce = (req, res) => {
  const sauceId = req.params.id;
  const userId = req.auth.userId;
  const like = req.body.like;

  Sauce.findOne({ _id: sauceId })
    .then((sauce) => {
      if (like == 1) {
        if (sauce.usersLiked.includes(userId)) {
          return res.status(401).json({ message: "Vous avez déjà noté la sauce" });
        } else {
          Sauce.updateOne(
            { _id: sauceId },
            {
              $inc: { likes: 1 },
              $push: { usersLiked: userId },
            }
          ).then(() => res.status(200).json({ message: "Vous avez liké" }))
           .catch (error => res.status(404).json({error : "like impossible"})) 
        }
      } else if (like == -1) {
        if (sauce.usersDisliked.includes(userId)) {
          res.status(401).json({ message: "Vous avez déjà noté la sauce" });
        } else {
          Sauce.updateOne(
            { _id: sauceId },
            {
              $inc: { dislikes: +1 },
              $push: { usersDisliked: userId },
            }
          ).then(() => res.status(200).json({ message: "Vous avez disliké" }))
           .catch (error => res.status(404).json({error : "dislike impossible"})) 
        }
      } else if (like == 0) {
        if (sauce.usersDisliked.includes(userId)) {
          Sauce.updateOne(
            { _id: sauceId },
            {
              $pull: { usersDisliked: userId },
              $inc: { dislikes: -1 },
            }
          )
           .then(() => res.status(200).json({ message: "Votre disliké a été retiré" }))
           .catch (error => res.status(404).json({error : "dislike impossible"})) 
          ;
        } else if (sauce.usersLiked.includes(userId)) {
          Sauce.updateOne(
            { _id: sauceId },
            {
              $pull: { usersLiked: userId },
              $inc: { likes: -1 },
            }
          )
            .then(() => res.status(200).json({ message: "Votre liké a été retiré" }))
            .catch (error => res.status(404).json({error : "dislike impossible"})) 
          ;
        }
      }
    })
    .catch((error) => res.status(400).json({ error }));
};