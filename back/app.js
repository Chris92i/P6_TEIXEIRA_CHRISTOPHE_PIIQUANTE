const express = require("express");

//creer une application express
const app = express();

//import du module path
const path = require("path");

// permet a express de parser les json
app.use(express.json());

const mongoose = require("mongoose");

//on enregistre nos routeurs user et sauce
const userRoute = require("./routes/user");

const sauceRoute = require("./routes/sauce");



mongoose
  .connect(
    "mongodb+srv://Bob2009:Openclassrooms01@cluster0.6hbeb7w.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

// pour le CORS (Cross Origin Resource Sharing)
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
  //res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

//la requete vers le répertoire image n'est pas gérée, il faut ajouter une route pour la gerer
// cela indique à Express qu'il faut gerer la ressource image de manière statique
app.use("/images",express.static(path.join(__dirname,"images")))


// 2 grosses routes, nos routeurs users et sauces
app.use("/api/auth", userRoute);
app.use("/api/sauces", sauceRoute);

module.exports = app;
