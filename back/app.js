const express = require("express");

//creer une application express
const app = express();

const path = require("path");

// permet a express de parser les json
app.use(express.json());

const mongoose = require("mongoose");

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

app.use("/images",express.static(path.join(__dirname,"images")))


// 2 grosses routes
app.use("/api/auth", userRoute);
app.use("/api/sauces", sauceRoute);

module.exports = app;
