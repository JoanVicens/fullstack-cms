const express = require('express');
const certificats = require('./certificats');
const gmail = require('./gmail');
const mailer = require('../mailing/index.js');

const router = express.Router();

function informacioNecessaria(music) {
  const informacioNecessaria = ['nom', 'cognoms', 'dni', 'instrument']
  const info = Object.keys(music)

  informacioNecessaria.forEach(attr => {
    if(!info.includes(attr)) return false
  });

  return true
}


router.post('/certificats', (req, res) => {
    const musics = req.body.infoMusics;
    const opcions = req.body.opcions

    certificats.setPeriode(opcions.periode)

    if(musics) {
      musics.forEach(async music => {
        if(informacioNecessaria(music)) {
          await certificats.generarCertificat(music)
          await mailer.enviarCertificat(music, opcions)
        }
      });
    }


  res.status(200)
})


module.exports = router;
