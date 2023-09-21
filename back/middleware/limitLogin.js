const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 3 * 60 * 1000, // 15 minutes
    max: 3, // Limite chaque IP à 100 requetes toutes les 15 min
    message: 'Trop de tentative, votre compte est bloqué pendant 15min'
  });

  module.exports = limiter;