// import du model Sauce
const Sauce = require("../models/sauce")


exports.createSauce = (req,res) => {
        const sauce = new Sauce({
            ...req.body 
        });
        sauce.save().then(
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

exports.getAllSauces = (req, res) => {
        Sauce.find().then(
          (sauce) => {
            res.status(200).json(sauce);
          }
        ).catch(
          (error) => {
            res.status(400).json({
              error: error
            });
          }
        );
};


exports.getOneSauce = (req,res) => {
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

exports.updateSauce = (req, res) => {
    const sauce = new Sauce({
        _id: req.params.id,
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        userId: req.body.userId
      });
      Sauce.updateOne({_id: req.params.id}, sauce).then(
        () => {
          res.status(201).json({
            message: 'Sauce updated successfully!'
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

exports.deleteSauce = (req, res) => {
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

exports.likeSauce = (req, res) => {
    res.status(200).json({message : "ok"})
}