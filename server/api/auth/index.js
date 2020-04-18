const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const middlewares = require('../middlewares')
const jwt = require('jsonwebtoken');

const Music = require('../models/music');
const musicController = require('../controlers/musicControler');
const mailer = require('../mailing/index.js');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: '👑🧫'
  });
});

// Registre dels músics
router.post('/signup', (req, res, next) => {

  let music = new Music({
    _id: new mongoose.Types.ObjectId(),
    nom: req.body.nom,
    cognoms: req.body.cognoms,
    dni: req.body.dni,
    al: req.body.al,
    email: req.body.email,
    telefon: req.body.telefon,
    instrument: req.body.instrument,
    data_naixement: req.body.data_naixement,
    // data_registre: req.body.data_registre,
    sexe: req.body.sexe,
    pais: req.body.pais,
    tipo_compte: req.body.tipo_compte,
    password: req.body.password,
  });


  music
    .save()
    .then(result => { // music guardat

      mailer.enviarCorreuConfirmacio(result.email, result.secret_token);

      res.status(201).json({
        message: "Usuari creat correctament"
      });

    })
    .catch(error => { next(error); });

});

// Activació del copmte
router.get('/activate/:secret_token', (req, res, next) => {

  if(req.params.secret_token) {
    const token = req.params.secret_token;
    const now = Date.now().valueOf() / 1000;

    try {
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

      if (typeof decoded.exp !== 'undefined' && decoded.exp < now) {
        const err = new Error('El token ha expirat');
        notAuthorized(err, req, res, next);
      }

      Music.findOne({_id: decoded.id, data_registre: decoded.data_registre})
      .then(music => {
        if(music) { // Ha trobat el músic amb el token secret
          Music.updateOne(
            {_id: decoded.id, data_registre: decoded.data_registre},
            {secret_token: '', compte_verificat: true})
            .then(result => {
              res.status(201).json({
                activat: result.nModified === 1
              });
            })
            .catch(error => { next(error); })
          } else {
            res.status(404).json({
              message: 'Token no trovat'
            })
          }
        })
        .catch(err => { next(err); })

    } catch(err) {
      next(err);
    }



  } else {
    // This response is sent when the web server, after performing server-driven content negotiation,
    // doesn't find any content that conforms to the criteria given by the user agent.
    res.redirect(406, '/signin');
  }

});

router.post('/login', async (req, res, next) => {


  const credencials = {
    email: req.body.email,
    password: req.body.password
  }

    const autenticar = musicController.autenticar(credencials)

    autenticar
      .then(music => {
        if(music) {
          // Credencials CORRECTES
          // console.log('LOGING', music._id);
          req.session.musicId = music._id
          res.status(200).json({
            message: 'autenticat'
          })
        } else {
          // Credencials ERRÒNEES
          middlewares.respondError422(res, next);
        }

      })
      .catch(err => {
        console.log(err);
        res.status(500)
        next(err);
      })

});

router.get('/info', (req, res, next) => {
  // console.log('INFO', req.session.musicId);
  if(req.session.musicId) {
    Music.findOne({_id: req.session.musicId})
      .then(music => {
        res.status(201).json({
          music
        });
      })
      .catch(err => {
        next(err)
      })
  } else {
    res.status(404).json({
      message: "No s'ha trobata el músic"
    })
  }
})

router.get('/logout', (req, res, next) => {
  req.session.destroy(err => {
    if(err) {
      res.status(500);
      next(err);
    } else {
      res.status(200).json({
        message: 'Sessió tancada correctament'
      })
    }
  })
})

module.exports = router;
