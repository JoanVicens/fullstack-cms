const jwt = require('jsonwebtoken');
const UUID = require("uuid");
const bcrypt = require('bcryptjs');
const Music = require('../models/music');
const newsletter = require('../config/newsletter.js');
const mailer = require('../mailing')

exports.autenticar = async (credencials) => {

  try {
    const music = await Music.findOne(
      {
        $and: [
          { email: credencials.email },
          { compte_verificat: true }
        ]
      },
      { password: 1, nom: 1 }
    )

    if (music) { // S'ha trobat el music
      const correctPasword = await bcrypt.compare(credencials.password, music.password)
      if(correctPasword) {
        const token = await setSessionId(music._id)
        return {token, name: music.nom }
      } else {
        const invalidCredentials = new Error('Credencials errònies')
        invalidCredentials.message = 'Credencials errònies'
        return invalidCredentials
      }
    }
  
  } catch (err) {
    return err
  }

  return;
}

setSessionId = async (musicId) => {
  const session_id = UUID.v4();

  return await Music.findByIdAndUpdate(
    { '_id': musicId },
    { 'session_id': session_id }
  ).then(() => {
    return session_id
  }).catch(err => {
    return new Error(err)
  })
}

exports.getMusicBySession = (sessionId) => {
  return Music.findOne({ 'session_id': sessionId })
    .then(music => {
      return music
    })
    .catch(err => {
      next(err)
    })
}

exports.deletePrivateInfo = (music) => {

  const music_data = {
    _id: music._id,
    nom: music.nom,
    cognoms: music.cognoms,
    dni: music.dni,
    al: music.al,
    email: music.email,
    telefon: music.telefon,
    corda: music.corda,
    data_naixement: music.data_naixement,
    data_registre: music.data_registre,
    sexe: music.sexe,
    pais: music.pais,
    tipo_compte: music.tipo_compte,
    llista_correu: music.llista_correu,
  }

  return music_data

}

exports.activate = (token) => {
  const now = Date.now().valueOf() / 1000;
  const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

  if (typeof decoded.exp !== 'undefined' && decoded.exp < now) {
    const err = new Error('El token ha expirat');
    notAuthorized(err, req, res, next);
  }

  return Music.findOne({ _id: decoded.id, data_registre: decoded.data_registre })
    .then(music => {
      if (music) { // Ha trobat el músic amb el token secret
        Music.updateOne(
          { _id: decoded.id, data_registre: decoded.data_registre },
          { secret_token: '', compte_verificat: true })
          .then(result => {
            return result.nModified === 1
          })
      }
    })
    .catch(error => { return error })
}

exports.register = async (music) => {

  try {
    const mailjetID = await newsletter.afegirContacte(music)

    if(mailjetID) {
      music.mailjet_id = mailjetID
      const newMusic = await music.save()

      if(newMusic instanceof Error) {
        newsletter.eliminarContacte(mailjetID)
      } else {
        mailer.enviarCorreuConfirmacio(newMusic.email, newMusic.secret_token);
      }

      return newMusic;
    } else {
      return new Error('Newsletter error')
    }
  } catch(err) {
    return new Error(err.message)
  }  
}