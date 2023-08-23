const jwt = require('jsonwebtoken')


module.exports = (req, res, next) =>{
try{
    //on récupère le token du header Authorization et on split via l'espace après Bearer
    const token = req.headers.authorization.split(' ')[1]
    //on utilisation la fonction verify de jwt pour vérifier que le token est bon en lui donnant la clé 
    const decodedToken = jwt.verify(token,'RANDOM_TOKEN_SECRET')
    // extraction de l'user ID du token et on l'ajout dans l'objet REQUEST
    const userId = decodedToken.userId
    req.auth = {
        userId: userId
    };
    next();
}
catch(error){
    res.status(401).json({error})
}
}