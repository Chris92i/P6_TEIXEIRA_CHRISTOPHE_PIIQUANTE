const express = require('express')

const app = express()

const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://Bob2009:Openclassrooms01@cluster0.6hbeb7w.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));




  
app.use((req,res) => {
    res.json({ message : 'votre requête a bien été reçue !' })
})







module.exports = app

