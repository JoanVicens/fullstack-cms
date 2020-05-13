const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const middlewares = require('../middlewares')

const Schema = mongoose.Schema;

//==============================================================================
// MODEL MUSIC
//==============================================================================

const musicSchema = new Schema({
  _id: mongoose.Types.ObjectId,
  nom: { type: 'string', required: true },
  cognoms: { type: 'string', required: true },
  dni: { type: 'string' },
  al: {
    type: 'Number',
  },
  email: {
    type: 'string',
    unique: true,
    validate: {
      validator: function(correu) {
        return /^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(correu);
      },
      message: "Introdueix un correu vàlid"
    }
  },
  telefon: { type: 'string' },
  corda: { type: 'string', required: true },
  data_naixement: { type: 'date' },
  data_registre: { type: 'date', required: true, default: Date.now },
  sexe: { type: 'string' },
  pais: { type: 'string' },
  tipo_compte: {
    type: 'number',
    default: 0
  },
  compte_verificat: {
    type: 'boolean',
    default: false
  },
  secret_token: {
    type: 'string'
  },
  password: { type: 'string' },
  session_id: {type: 'object', default: ''},
  llista_correu: {type: 'boolean'},
  compte_actiu: {type: 'boolean', required: true, default: true},
  mailjet_id: {type: 'string'}
});

//Comprova que el AL no estigui registrat
musicSchema.pre("save", async function (next) {
  const music = this;

  let musicRegistrat = false;

  if(music.al !== '000000') {
    musicRegistrat = await Music.findOne({$or: [{al: music.al}, {email: music.email}]});
  }

  if(musicRegistrat) {
    // El AL ja està regsitrat
    const error = new Error('El usuari ja està registrat');
    next(error);
  } else {
    // No està resgistrar, calcula el hash de la contrasenya
    if(music.isModified("password")) {
      music.password = await bcrypt.hash(music.password.trim(), 8);

      const token_payload = {
        id: music._id,
        data_registre: music.data_registre
      }

      // Creem el token
      const options = { expiresIn: '10h' }
      music.secret_token = middlewares.crearJsonWebToken(token_payload, options)
    }
    next();
  }
})


const Music = mongoose.model('musics', musicSchema);

module.exports = Music;
