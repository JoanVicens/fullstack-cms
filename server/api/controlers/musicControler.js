const middlewares = require('../middlewares')
const bcrypt = require('bcryptjs');
const Music = require('../models/music');


exports.autenticar = (credencials) => {
  let id = '';

  const music = Music.findOne(
    { $and: [
      { email: credencials.email },
      { compte_verificat: true }
    ]},
    { password: 1 }
  )
  .then(async music => {
    if(music) { // S'ha trobat el music
      id = music._id;
      return bcrypt.compare(credencials.password, music.password)
    } else {
      resolve(null);
    }
  })
  .then(autenticat => {
    if(autenticat) {
      return id
    } else {
      return ''
    }
  })
  .catch(error => {
    throw new Error("Error d'autentificació");
  })
  .catch(error => {
    throw new Error(error);
  })

  return music;
}
