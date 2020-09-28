const express = require('express');
const mongoose = require('mongoose');
const middlewares = require('../middlewares');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const Music = require('../models/music');
const musicController = require('../controllers/musicController');
const mailer = require('../mailing/index.js');

const router = express.Router();

// Registre dels músics
router.post('/registrar', async (req, res, next) => {

  if(req.body) {
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
      llista_correu: req.body.llista_correu
    });
  
    const newMusic = await musicController.register(music);

    if(newMusic instanceof Error) {
      res.status(500).json({ name: newMusic.name, message: newMusic.message });
    } else {
      res.status(201).json({ 
        name: 'notification', 
        message: 'Music registrar correctament', 
        action: 'LOGIN'
      });
    }
  } else {
    next();
  }

});

// Activació del copmte
router.get('/activate/:secret_token', async (req, res, next) => {

  if(req.params.secret_token) {
    const token = req.params.secret_token;

    const musicActivat = await musicController.activate(token)

    if (musicActivat) {
      res.status(201).json({ message: 'compte activat correctament' })
    } else {
      res.status(500).json({ message: "No s'ha pogut activar el compte" })
    }
  }

});

router.post('/autenticacio', async (req, res, next) => {

  const credencials = {
    email: req.body.email,
    password: req.body.password
  }

  const session = await musicController.autenticar(credencials)

  if(session instanceof Error) {
    res.status(500).json(session.Error)
  } else {
    req.session.session_id = session.token
    res.status(200).send(session)
  }
});

router.get('/info', middlewares.musicAutoritzat, (req, res, next) => {
  
  musicController.getMusicBySession(req.session.session_id)
  .then(music => {
    res.status(201).json({ music });
  })
  .catch(() => {
    next();
  })
})

router.get('/logout', (req, res, next) => {
  req.session.destroy(err => {
    if(err) {
      res.status(500);
      next(err);
    } else {
      res.status(200).json({
        _message: 'Sessió tancada correctament'
      })
    }
  })
})

router.post('/token_recuperacio', (req, res) => {

  const email = req.body.email

  Music.findOne({'email': email})
  .then(async music => {
    if(music) {
      
      music.secret_token = await middlewares.generateBycryptToken()
      music.save()
      .then(() => {
        mailer.enviarRecuperacio(email, music.secret_token)
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

router.post('/recuperar', async (req, res) => {
  if(req.body.token && req.body.password) {
    const pass = req.body.password
    const token = req.body.token

    const passEncriptda = await bcrypt.hash(pass.trim(), 8);

    Music.findOneAndUpdate(
      { secret_token: token },
      { password: passEncriptda, secret_token: '' }
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