const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const middlewares = require('../middlewares')
const newsletter = require('../config/newsletter');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const UUID = require("uuid");

const Music = require('../models/music');
const musicController = require('../controlers/musicControler');
const mailer = require('../mailing/index.js');

const router = express.Router();


// Registre dels músics
router.post('/registrar', (req, res, next) => {

  newsletter.afegirContacte(req.body) // Nom afegeix el correu a mailjet, no el subscriu a res
  .then(result => {
    const mailjetID = result.body.Data[0].ID

    let music = new Music({
      _id: new mongoose.Types.ObjectId(),
      nom: req.body.nom,
      cognoms: req.body.cognoms,
      dni: req.body.dni,
      al: req.body.al,
      email: req.body.email,
      telefon: req.body.telefon,
      corda: req.body.corda,
      data_naixement: req.body.data_naixement,
      data_registre: Date.now(),
      sexe: req.body.sexe,
      pais: req.body.pais,
      tipo_compte: req.body.tipo_compte,
      password: req.body.password,
      llista_correu: req.body.llista_correu,
      mailjet_id: mailjetID
    });


    music
    .save()
    .then(result => { // music guardat


      console.log('creat correctament!!!')

      if(req.body.llista_correu) {
        newsletter.afegirALaLlista(result.mailjet_id)
      }

      mailer.enviarCorreuConfirmacio(result.email, result.secret_token);

      res.status(201).json({
        message: "Usuari creat correctament"
      });

    })
    .catch(error => { 
      newsletter.eliminarContacte(mailjetID)
      next(error); 
    });

  })
  .catch(next)


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

router.post('/autenticacio', async (req, res, next) => {


  const credencials = {
    email: req.body.email,
    password: req.body.password
  }

    const autenticar = musicController.autenticar(credencials)

    autenticar
      .then(musicId => {
        if(musicId) {
          // Credencials CORRECTES

          let session_id = UUID.v4();

          Music.findOneAndUpdate(
            {'_id': musicId},
            {'session_id': session_id}
          ).then(response => {
            req.session.session_id = session_id
            res.status(200).send({ token: session_id })
          }).catch(err => {
            res.status(500).json({
              message: "No s'ha pogut guardar la sessió"
            })
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

  if(req.session.session_id) {
    Music.findOne({'session_id': req.session.session_id})
      .then(music => {
        res.status(201).json({
          music
        });
      })
      .catch(err => {
        next(err)
      })
  } else {
    res.status(401).json({
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

router.post('/token_recuperacio', (req, res) => {

  const email = req.email

  Music.findOne({email})
  .then(music => {
    if(music) {
      const token_payload = {
        id: music._id,
        data_registre: music.data_registre
      }

      music.secret_token = middlewares.crearJsonWebToken(token_payload, { expiresIn: '10h' })

      music.save()
      .then(() => {
        res.status(200).json({message: "S'ha enviat un correu amb les instruccions"})
      })
      .catch(console.error)
    } else {
      res.status(300).json({message: "No s'ha trovat el correu"})
    }
  })
  .catch(err => {
    res.status(500).json(err)
  })

})

router.post('/recuperar', (req, res) => {
  if(req.body.jwt && req.body.password) {
    const pass = req.body.password

    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

    if (typeof decoded.exp !== 'undefined' && decoded.exp < now) {
      const err = new Error('El token ha expirat');
      notAuthorized(err, req, res, next);
    }


    // const passEncriptda = await bcrypt.hash(pass.trim(), 8);

    Music.findOneAndUpdate(
      {'_id':decoded.id},
      {password: pass}
    )
    .then((result) => {
      res.status(200).json({message: 'Contrasenya canviada correctament'})
    })
    .catch(err => {
      res.status(500).json(err)
    })


  }
  res.status(400).sent()
})

module.exports = router;
