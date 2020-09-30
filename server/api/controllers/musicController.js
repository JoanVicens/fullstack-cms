const jwt = require('jsonwebtoken');
const UUID = require("uuid");
const bcrypt = require('bcryptjs');
const newsletter = require('../config/newsletter.js');
const mailer = require('../mailing');

// MODELS
const Music = require('../models/music');

const USER_NORMAL = 0;
const USER_JUNTA = 1;
const USER_PRESIDENT = 2;
const USER_ADMIN = 3;

// PRIVATE FUNCTIONS

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

// GETTERS

exports.listAllMusicians = async (filter) => {
  const defaultFilter = {
    nom: true,
    cognoms: true,
    corda: true,
    tipo_compte: true,
    compte_actiu: true,
    llista_correu: true
  }

  return await Music.find({}, filter | defaultFilter)
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

exports.getMusicById = (musicId) => {
  return Music.findById(musicId)
    .then(music => { return music })
    .catch(err => { next(err) })
}

// CHECKS

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
        return {token, name: music.nom , _id: music._id}
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

exports.userHasPermision = (requester, music) => {
  if(requester.tipo_compte == USER_ADMIN) {
    return true
  } else if(music) {
    return requester.tipo_compte > 0 && requester.tipo_compte > music.tipo_compte
  } else {
    return requester.tipo_compte > 0
  }
}


// SIMPLE CHANGES (1 property)

exports.changeType =  async (music, code) => {
  music.tipo_compte = code;

  music.save()
    .then(() => {
      return {
        message: "S'ha actualitzat el tipo de compte"
      }
    })
    .catch(() => {
      return new Error('Error al guardar el nou tipo')
    })
}

exports.changeAcountState = async (music, state) => {
  music.compte_actiu = state;

  music.save()
    .then(() => {
      return {
        message: `S'ha actualitzat l'estat de compte a ${state ? 'actiu' : 'inactiu'}`
      }
    })
    .catch(() => {
      return new Error("Error al guardar l'estat")
    })

} 

//=========================


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
    compte_actiu: music.compte_actiu
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

