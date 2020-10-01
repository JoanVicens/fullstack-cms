const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');


const newsletter = require('../config/newsletter');
// const people = require("./people");

const router = express.Router();

const Curs = require('../models/curs');
const Assaig = require('../models/assaig');
const Music = require('../models/music');

const actiuaciomiddleware = require('./actuacio.js');
const musicMiddleware = require('./music.js')
const assaigMiddleware = require('./assaig')

//========================

const musicController = require('../controllers/musicController');
const cursController = require('../controllers/cursController');

router.use((req, res, next) => { // User has to be logged
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


router.get('/me', async (req, res) => {
  /*   
  Returns the next user information:
    * Personal information
    * Attendance information
  */
  try {
    const music = await musicController.getMusicBySession(req.session.session_id)
    const result = await cursController.getAttendaceInformationFromMusicId(music._id)

    res.status(200)
    .json({
      user: musicController.deletePrivateInfo(music),
      attendance: result
    })
    
  } catch (err) {
    res.status(500)
  }

})


// CURS

router.get('/cursos', (req, res) => {
  Curs.find({})
  .populate({
    path:'semestres.actuacions',
    populate: {
      path: 'assistents',
      select: 'nom cognoms corda'
    }
  })
  .populate({
    path: 'semestres.assajos'
  })
  .then(cursos => {
    res.status(200).json({cursos})
  })
  .catch(err => {
    console.log(err);
  })
})

router.get('/curs/actiu', (req, res) => {

  Curs.findOne({'curs_actiu': true})
  .populate({
    path:'semestres.actuacions',
    populate: {
      path: 'assistents',
      select: 'nom cognoms corda'
    }
  })
  .populate({
    path: 'semestres.assajos'
  })
  .then(curs => {
    res.status(200).json({curs})
  })
  .catch(err => console.log(err))
})

router.get('/curs/:id', (req, res) => {

  const id = req.params.id

  Curs.findOne({_id: id})
    .then(cursos => {
      res.status(200).json({cursos})
    })
})

router.put('/curs', async (req, res) => {
  const body = req.body;

  if(!body._id) {
    // Crea un nou curs
    let baseSemestre = body.curs.replace('/', '-') + '-';

    let nouCurs = new Curs({
      _id: new mongoose.Types.ObjectId(),
      curs: body.curs,
      director: body.director,
      curs_actiu: body.curs_actiu,
      anotacio: body.anotacio,
      semestres: [
        {
          semestreId: baseSemestre + '1',
          numero: 1,
          assajos: [],
          actuacions: []
        },
        {
          semestreId: baseSemestre + '2',
          numero: 2,
          assajos: [],
          actuacions: []
        }
      ]
    })

    // Si el nou curs es crea com el curs actiu, es modifica el que avans ho era
    if(nouCurs.curs_actiu) {
      await Curs.updateMany({curs_actiu: true}, {curs_actiu: false})
    }

    nouCurs.save()
    .then(result => res.status(200).json(result))
    .catch(error => console.log(error));
  } else {
    // Modifica el curs

    if(body.curs_actiu) {
      await Curs.updateMany({curs_actiu: true}, {curs_actiu: false})
    }

    Curs.findOneAndUpdate(
      {_id: body._id},
      { // update query
        curs: body.curs,
        director: body.director,
        anotacio: body.anotacio,
        curs_actiu: body.curs_actiu
      },
      {new: true}
    ).then(response => {
      res.status(200).json(response)
    })
    .catch(err => {
      console.log(err);
    })
  }

})

router.delete('/curs/:id', (req, res) => {
  const id = mongoose.Types.ObjectId(req.params.id);

  Curs.deleteOne(
    {_id: id}
  )
  .then(result => res.status(200).json(result))
  .catch(error => console.log(error));
})

// ASSAJOS
router.use('/assaig', assaigMiddleware);


// ACTUACIONS
router.use('/actuacio', actiuaciomiddleware);

// MUSICS
router.use('/music', musicMiddleware);


module.exports = router;
