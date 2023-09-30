//importation de mangoose
const mongoose = require("mongoose");
const uniquev = require("mongoose-unique-validator");




//mise en place du schema user
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// utilisation du plugin pour vérification adresse email unique
userSchema.plugin(uniquev);

// nous exportons ce schéma en tant que modèle Mongoose appelé « user », le rendant par là même disponible pour notre application Express.
module.exports = mongoose.model("User", userSchema);
