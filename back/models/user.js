//importation de mangoose
const mongoose = require('mongoose')

//mise en place du schema user
const sauceSchema = mongoose.Schema({
    email : { type : String, required: true},
    password: { type: String, required: true },

})



// nous exportons ce schéma en tant que modèle Mongoose appelé « sauce », le rendant par là même disponible pour notre application Express.
module.exports = mongoose.model('sauce',sauceSchema)