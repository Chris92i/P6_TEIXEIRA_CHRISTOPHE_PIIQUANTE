//importation de mangoose
const mongoose = require("mongoose");

//mise en place du schema sauce
const sauceSchema = mongoose.Schema({
  userId: { type: String, require: true },
  name: { type: String, require: true },
  manufacturer: { type: String, require: true },
  description: { type: String, require: true },
  mainPepper: { type: String, require: true },
  imageUrl: { type: String, require: true },
  heat: { type: Number, require: true },
  likes: { type: Number, require: false, default: 0 },
  dislikes: { type: Number, require: false, default: 0 },
  userLiked: { type: [String], require: false },
  userDisled: { type: [String], require: false },
});

// nous exportons ce schéma en tant que modèle Mongoose appelé « sauce », le rendant par là même disponible pour notre application Express.
module.exports = mongoose.model("Sauce", sauceSchema);
