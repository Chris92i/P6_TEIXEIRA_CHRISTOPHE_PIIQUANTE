const express = require("express");
const helmet = require('helmet'); //import helmet
const app = express();//creer une application express
const path = require("path"); //import du module path

app.use(express.json()); // permet a express de parser les json

const mongoose = require("mongoose");

//on enregistre nos routeurs user et sauce
const userRoute = require("./routes/user");
const sauceRoute = require("./routes/sauce");

const rateLimit = require('express-rate-limit');
require('dotenv').config()
const mongoSanitize = require('express-mongo-sanitize');


mongoose
  .connect(
    process.env.DB,
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


app.use(mongoSanitize()); // Contre les injections


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limite chaque IP à 100 requetes toutes les 15 min
  message: 'Trop de tentative, votre compte est bloqué pendant 15min'
});

// application de rateLimite à toutes les requetes
app.use(limiter);

// utilisation du middleware d'helmet qui définit plusieurs en-têtes http pour sécuriser l'application
app.use(helmet());


// 2 grosses routes, nos routeurs users et sauces
app.use("/api/auth", userRoute);
app.use("/api/sauces", sauceRoute);

module.exports = app;
