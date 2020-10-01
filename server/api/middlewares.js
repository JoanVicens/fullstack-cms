const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const musicController = require('./controllers/musicController')

exports.crearJsonWebToken = function(payload, opt) {
  const token = jsonwebtoken.sign(payload, process.env.TOKEN_SECRET, opt)
  return token;
}

exports.generateBycryptToken = async function() {
  const buf = crypto.randomBytes(128);
  const token = buf.toString('hex')
  return await bcrypt.hash(token, 8);
}

exports.musicAutenticat = function(req, res, next) {

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

exports.musicAutoritzat =  async (req, res, next) => {
  const requester = await musicController.getMusicBySession(req.session.session_id)

  if(requester.tipo_compte > 0) {
    next();
  } else {
    next(new Error('No tens autorització'))
  }
}


exports.respondError422 = function(res, next) {
  res.status(422);
  const error = new Error('Credencials incorrectes');
  next(error);
}

// module.exports = {crearJsonWebToken, respondError422, musicAutoritzat}
