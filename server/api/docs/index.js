const express = require('express');
const certificats = require('./certificats');
const gmail = require('./gmail');
const mailer = require('../mailing/index.js');

const Music = require('../models/music');

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


function moureArxiu(file) {
  return new Promise((resolve, reject) => {
    let fileURI = `uploads/${file.name}`
    file.mv(fileURI, (err) => {
      if(err) reject(err)

      resolve({
        nom: file.name,
        uri: fileURI
      })
    })
  })
}

function enviarNewsletter(correu, uris) {
  Music.find(
    {
      'compte_verificat': true,
      'llista_correu': true,
      'compte_actiu': true
    }).then(musics => {
      musics.forEach(music => {
        mailer.enviarCorreu(music, correu, uris)
      });

    })
}


router.post('/newsletter', (req, res) => {


  const correu = req.body
  const envios = [] // Promeses dels enviament del correu
  const arxius = [] // Arxius pujats

  if(req.files) {
    const arxius = Object.keys(req.files)
    const uploads = []

    arxius.forEach(arxiu => {
      let file = req.files[arxiu]
      uploads.push(moureArxiu(file))
    });

    Promise.all(uploads)
    .then((uris) => {
      arxius = uris
      envios.push(enviarNewsletter(correu, uris))
    })
    .catch(err => {
      res.status(500).send(err)
    })
  } else {
    envios.push(enviarNewsletter(correu))
  }

  Promise.all(envios)
  .then(results => {
    // Borra els arxius pujats
    arxius.forEach(adjunt => {
      fs.unlinkSync(adjunt.uri)
    });

    res.status(200).json({
      message: "Correus enviats correctament",
      results
    })
  })
  .catch(err => {
    res.status(500).json(500)
  })


})


module.exports = router;
