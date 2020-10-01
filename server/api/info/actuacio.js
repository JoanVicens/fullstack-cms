const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const calendari = require("../services/calendari");

const Actuacio = require('../models/actuacio');
const Curs = require('../models/curs');

const musicController = require('../controllers/musicController.js');
const actuacioController = require('../controllers/actuacioController.js');

function guardarNovaActuacio(actuacio, semestreId) {

  actuacio.calendar_event = actuacio.data !== undefined

  const novaActuacio = new Actuacio({
    _id: new mongoose.Types.ObjectId(),
    titol: actuacio.titol,
    data: actuacio.data,
    hora_inici: actuacio.hora_inici,
    hora_fi: actuacio.hora_fi,
    assistents: actuacio.assistents,
    lloc: actuacio.lloc,
    repertori: actuacio.repertori,
    descripcio: actuacio.descripcio,
    calendar_event: actuacio.calendar_event
  })

  return novaActuacio.save()
  .then(result => {
    console.log('Id actuació', result._id);
    if(novaActuacio.data) {
      calendari.guardarEvent(actuacio, result._id)
    }


    Curs.findOneAndUpdate(
      {'semestres.semestreId': semestreId},
      {
        $push: {
          "semestres.$.actuacions": result._id
        }
      }
    )
    .then(result => {
      return result
    })
    .catch(err => {
      console.log(err);
    })

  })
  .catch(err => {
    console.log(err);
  });
}

function actualitzarActuacio(actuacio) {

  return Actuacio.findOneAndUpdate(
    {'_id': actuacio._id},
    {
      titol: actuacio.titol,
      data: actuacio.data,
      hora_inici: actuacio.hora_inici,
      hora_fi: actuacio.hora_fi,
      assistents: actuacio.assistents,
      lloc: actuacio.lloc,
      repertori: actuacio.repertori,
      descripcio: actuacio.descripcio,
    },
    {new: true}
  )
  .then(result => {
    if(!actuacio.calendar_event) {
      calendari.guardarEvent(actuacio, result._id)
    } else {
      calendari.modificarEvent(actuacio)
    }

    return result
  })
  .catch(err => {
    return err
  })
}

router.put('/', async (req, res) => {
  // NOU CONCERT
  if(!req.body.actuacio) {
    res.status(400)
  }

  const actuacio = req.body.actuacio
  const semestreId = req.body.semestreId

  if(!actuacio._id) {
    let promise = guardarNovaActuacio(actuacio, semestreId)

    promise.then(result => {
      res.status(200).json(result)
    })
    .catch(err => {
      res.status(500).json(err)
    })
  } else {
    let promise = actualitzarActuacio(actuacio)

    promise.then(result => {
      res.status(200).json(result)
    })
    .catch(err => {
      res.status(500).json(err)
    })
  }
})

router.delete('/:id', (req, res) => {
  const actuacioId = mongoose.Types.ObjectId(req.params.id);

  Actuacio.deleteOne(
    {"_id": actuacioId}
  ).then(async curs => {
    calendari.eliminarEvent(req.params.id)

    // Actualitza Curs
    await Curs.findOne(
      {'semestres.actuacions': actuacioId}
    )
    .then(curs => {
      curs.semestres.forEach(semestre => {
        semestre.actuacions.pop(req.params.id)
      });

      curs.save()
      .then(result => {
        console.log('curs: %s actualizat', curs.curs);
      })
      .catch(err => console.log(err))
    })
    .catch(err => {
      console.log(err);
    })

    res.status(200).json(curs)
  })
  .catch(err => {
    res.status(500).json(err)
  })

})

router.put('/assistents', (req, res) => {
  const body = req.body;
  const actuacioId = mongoose.Types.ObjectId(body.actuacioId);

  Actuacio.findOneAndUpdate(
    {'_id': actuacioId},
    {
      $set: {
        "assistents": body.assistents
      }
    }
  )
  .then(result => {
    res.status(200).json(result)
  })
  .catch(err => {
    console.log(err);
  })
})

router.put('/:action/assistent/:id_actuacio', async (req, res) => {

  const session_id = req.session.session_id
  const music = await musicController.getMusicBySession(session_id);
  const id_actuacio = req.params.id_actuacio
  let action


  if (req.params.action == 'afegir') {
    action = actuacioController.addAttendant
  } else if (req.params.action == 'llevar') {
    action = actuacioController.removeAttendant
  }

  action(id_actuacio, music._id)
  .then(() => {
    res.sendStatus(201)
  })
  .catch(() => {
    res.sendStatus(500).json({ message: result.message })
  })

})

router.get('/actiu', (req, res) => {

  Curs.findOne({'curs_actiu': true})
  .populate({path:'semestres.actuacions'})
  .then(curs => {
    res.status(200).json({curs})
  })
  .catch(err => console.log(err))
})

module.exports = router;
