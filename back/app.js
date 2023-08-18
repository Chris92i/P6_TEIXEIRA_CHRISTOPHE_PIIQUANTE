const express = require('express')

const app = express()
app.use(express.json())
const mongoose = require('mongoose')

const userRoute = require("./routes/user")

mongoose.connect('mongodb+srv://Bob2009:Openclassrooms01@cluster0.6hbeb7w.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
  });

  
app.use("/api/auth",userRoute)


module.exports = app

