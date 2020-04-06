const jsonwebtoken = require('jsonwebtoken');
const session = require('express-session');

function crearJsonWebToken(payload, opt) {
  const token = jsonwebtoken.sign(payload, process.env.TOKEN_SECRET, opt)
  return token;
}

function musicAutoritzat(req, res, next) {

  if(req.session && req.session.cookie) {
    const cookie = req.session.cookie;
    const now = Date.now().valueOf() / 1000;

    // Comprova que la sessió sigui vàlida
    if (typeof cookie._expires !== 'undefined' && cookie._expires < now) {
      const err = new Error('Sessió expirada');
      next(err);
    } else {
      next()
    }

  } else {
    const err = new Error('Necessites identificar-te')
    next(err);
  }
}

function respondError422(res, next) {
  res.status(422);
  const error = new Error('Unable to login.');
  next(error);
}

module.exports = {crearJsonWebToken, respondError422, musicAutoritzat}
