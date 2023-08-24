// import du model Sauce
const Sauce = require("../models/sauce")


exports.createSauce = (req,res){
        const sauce = new Sauce({
          title: req.body.title,
          description: req.body.description,
          imageUrl: req.body.imageUrl,
          price: req.body.price,
          userId: req.body.userId
        });
        thing.save().then(
          () => {
            res.status(201).json({
              message: 'Post saved successfully!'
            });
          }
        ).catch(
          (error) => {
            res.status(400).json({
              error: error
            });
          }
        );
}

exports.getAllSauces = (req, res) {
        Sauces.find().then(
          (sauces) => {
            res.status(200).json(sauces);
          }
        ).catch(
          (error) => {
            res.status(400).json({
              error: error
            });
          }
        );
};


exports.getOneSauce = (req,res) {
    Sauce.findOne({
        _id: req.params.id
      }).then(
        (sauce) => { 
            if (!sauce){
            return res.status(404).json({message: "sauce non trouvée"})
        }
          res.status(200).json(sauce);
        }
      ).catch(
        (error) => {
          res.status(404).json({
            error: error
          });
        }
      );
}

exports.updateSauce = (req, res) {
    const sauce = new Sauce({
        _id: req.params.id,
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        userId: req.body.userId
      });
      Thing.updateOne({_id: req.params.id}, thing).then(
        () => {
          res.status(201).json({
            message: 'Thing updated successfully!'
          });
        }
      ).catch(
        (error) => {
          res.status(400).json({
            error: error
          });
        }
      );
}

exports.deleteSauce = (req, res){
    Sauce.deleteOne({_id: req.params.id}).then(
        () => {
          res.status(200).json({
            message: 'Deleted!'
          });
        }
      ).catch(
        (error) => {
          res.status(400).json({
            error: error
          });
        }
      );
}

exports.likeSauce = (req, res){
    res.status(200).json({message : "ok"})
}