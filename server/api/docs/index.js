const express = require('express');

// Certificat amb info personal, no està inclòs en el repositori
// const certificats = require('./certificats');
const certificats = require('./certificatEntrega');

const gmail = require('./gmail');
const mailer = require('../mailing/index.js');

const mongoose = require('mongoose');

const Music = require('../models/music');
const Correu = require('../models/correu');

const router = express.Router();

router.use((req, res, next) => {
  if(req.session.session_id) {
    Music.findOne({'session_id': req.session.session_id})
    .then(() => {
      next();
    })
    .catch(err => {
      res.status(500)
    });
  } else {
    res.status(401).json({message: 'notAuthorized'})
  }
})

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
  console.log(correu);
  const envios = [] // Promeses dels enviament del correu
  let arxius = [] // Arxius pujats

  if(req.files) {
    arxius = Object.keys(req.files)
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
      console.log('ERROR AQUÍ', err);
      res.status(500).send(err)
      return
    })
  } else {
    envios.push(enviarNewsletter(correu))
  }

  Promise.all(envios)
  .then(async results => {
    return new Promise(async (resolve, reject) => {
      if(correu.marcat) {
        // Borra el últim missatge marcat i els seus adjuntts
        await Correu.findOneAndDelete({marcat: true})
        .then(correu => {
          if(correu && correu.adjunts) {
            correu.adjunts.forEach(adjunt => {
              fs.unlinkSync(adjunt.uri)
            });

          }
        })
        .catch(console.error)
      }

      // Borra els arxius del últim missatge
      await Correu.findOne({}, {}, { sort: { 'data' : -1 } })
      .then(correu => {
        if(correu && correu.adjunts) {
          correu.adjunts.forEach(adjunt => {
            fs.unlinkSync(adjunt.uri)
          });
        }
      })
      .catch(console.error)

      // Inserta el nou missatge
      const nouCorreu = new Correu({
        _id: new mongoose.Types.ObjectId(),
        data: Date.now(),
        assumpte: correu.assumpte,
        html: correu.html,
        adjunts: arxius,
        marcat: correu.marcar || false,
      })


      nouCorreu.save()
      .then(() => {
        resolve()
      })
      .catch(console.error)
    })


  })
  .then(() => {
    res.status(200).json({
      message: "Acció finalitzada correctament"
    })
  })
  // .catch(err => {
  //   res.status(500).json(500)
  // })


})

router.get('/newsletters', (req, res) => {

  let correuMarcat, ultimCorreu, error

  Correu.find({}, {}, { sort: { 'data' : -1 } })
  .then(correus => {
    ultimCorreu = correus[0]

    correus.forEach(correu => {
      console.log(correu);
      if(correu.marcat) {
        correuMarcat = correu
      }
    });

    res.status(200).json({ultim: ultimCorreu, marcat: correuMarcat})
  })
  .catch(err => {
    res.status(500).json(err)
  })

})

module.exports = router;
