// import package multer pour la gestion des fichiers
const multer = require("multer");

// utilise le MIME_TYPES pour generer l'extension du fichier
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

// creation objet de configuration pour multer et utilisation de la fonction diskStorage pour l'enregistrer sur le disk
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype];
    //ajout d'un time stamp pour rendre le nom unique (à la milliseconde)
    callback(null, name + Date.now() + "." + extension);
  },
});

// utilisation de la méthode single pour utilisation de fichier unique et non pas groupe d'image
module.exports = multer({ storage }).single("image");
