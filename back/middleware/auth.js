const jwt = require("jsonwebtoken");

//importe le module dotenv et appell sa fonction config() => charge les variables d'environnement du fichier .env dans process.env
require('dotenv').config(); 

module.exports = (req, res, next) => {
  try {
    //on récupère le token du header Authorization et on split via l'espace après Bearer
    const token = req.headers.authorization.split(" ")[1];

    //on utilisation la fonction verify de jwt pour vérifier que le token est bon en lui donnant le token et la clé
    const decodedToken = jwt.verify(token, process.env.TOKEN);
    
    // extraction de l'user ID du token et on l'ajout dans l'objet REQUEST
    const userId = decodedToken.userId;
    req.auth = {
      userId: userId,
    };
    next();
  } catch (error) {
    res.status(401).json({ error });
  }
};
