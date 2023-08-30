//import du paquet http natif de node
const http = require("http");

//import de l'application express
const app = require("./app");

app.set("port", process.env.PORT || 3000);

// normalizePort => renvoie un port valide, qu'il soit fourni sous la forme d'un numéro ou d'une chaîne
const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT || "3000");
//on set le port sur lequel on fait tourner notre application
app.set("port", port);

// errorHandler => recherche les différentes erreurs et les gère de manière appropriée. Elle est ensuite enregistrée dans le serveur
const errorHandler = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const address = server.address();
  const bind =
    typeof address === "string" ? "pipe " + address : "port: " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges.");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use.");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

// creation du serveur et on passe notre app car c'est une fonction qui va recevoir la requete et la réponse
const server = http.createServer(app);

//configuration du serveur pour qu'il écoute 
server.listen(process.env.PORT || 3000);
