const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');

const calendari = require("./calendari");
const newsletter = require('../config/newsletter');
// const people = require("./people");

const router = express.Router();

const Curs = require('../models/curs');
const Assaig = require('../models/assaig');
const Music = require('../models/music');

const actiuaciomiddleware = require('./actuacions.js');


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

function guardarNouAssaig(assaig, semestreId) {
  assaig.calendar_event = assaig.data !== undefined

  const nouAssaig = new Assaig({
    _id: new mongoose.Types.ObjectId(),
    data: assaig.data,
    hora_inici: assaig.hora_inici,
    hora_fi: assaig.hora_fi,
    assistents: assaig.assistents,
    lloc: assaig.lloc,
    anotacio: assaig.anotacio,
    calendar_event: assaig.calendar_event
  })

  return nouAssaig.save()
  .then(result => {
    if(nouAssaig.data) {
      assaig.titol = 'Assaig Banda UJI'
      calendari.guardarEvent(assaig, result._id)
    }

    Curs.findOneAndUpdate(
      {'semestres.semestreId': semestreId},
      {
        $push: {
          "semestres.$.assajos": result._id
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

function actualitzarAssaig(assaig) {
  return Assaig.findOneAndUpdate(
    {'_id': assaig._id},
    {
      data: assaig.data,
      hora_inici: assaig.hora_inici,
      hora_fi: assaig.hora_fi,
      assistents: assaig.assistents,
      lloc: assaig.lloc,
      anotacio: assaig.anotacio,
      descripcio: assaig.descripcio,
    },
    {new: true}
  )
  .then(result => {
    if(!assaig.calendar_event) {
      assaig.titol = 'Assaig Banda UJI'
      calendari.guardarEvent(assaig, result._id)
    } else {
      assaig.titol = 'Assaig Banda UJI'
      calendari.modificarEvent(assaig)
    }

    return result
  })
  .catch(err => {
    return err
  })
}

router.put('/assaig', (req, res) => {
  // Crear i modificar assajos

  if(!req.body.assaig || !req.body.semestreId) {
    res.status(400)
  }

  const assaig = req.body.assaig
  const semestreId = req.body.semestreId

  assaig.semestre = semestreId

  if(!assaig._id) {
    let promise = guardarNouAssaig(assaig, semestreId)

    promise.then(result => {
      res.status(200).json(result)
    })
    .catch(err => {
      res.status(500).json(err)
    })
  } else {
    let promise = actualitzarAssaig(assaig)

    promise.then(result => {
      res.status(200).json(result)
    })
    .catch(err => {
      res.status(500).json(err)
    })
  }

})

router.put('/assajos', (req, res) => {
  // Crear varios assajos

  if(!req.body.assajos || !req.body.semestreId) {
    res.status(400)
  }

  const assajos = req.body.assajos
  const semestreId = req.body.semestreId

  const promeses = []

  assajos.forEach(assaig => {
    promeses.push(guardarNouAssaig(assaig, semestreId))
  });

  Promise.all(promeses).then(result => {
    res.status(200).json(result)
  })
  .catch(err => {
    res.status(500).json(err)
  })


})

router.delete('/assaig/:id', (req, res) => {
  // Borrar un assaig

  const assaigId = mongoose.Types.ObjectId(req.params.id);

  Assaig.deleteOne(
    {"_id": assaigId}
  ).then(async curs => {
    calendari.eliminarEvent(req.params.id)

    // Actualitza Curs
    await Curs.findOne(
      {'semestres.assajos': assaigId}
    )
    .then(curs => {
      curs.semestres.forEach(semestre => {
        let index = semestre.assajos.indexOf(req.params.id)
        semestre.assajos.splice(index, 1)
      });

      if(curs.curs_actiu)
        curs.curs_actiu = true

      curs.save()
      .then(result => {
        console.log('curs: %s actualizat', curs.curs_actiu);
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

router.put('/assaig/assistencia', (req, res) => {
  // Actualizar la assistencia d'un assaig

  const assaig = req.body.assaig;

  assaig.assistencia = assaig.assistents.length

  Assaig.updateOne(
    {'_id': assaig._id},
    {
      $set: {
        "assistents": assaig.assistents
      },
      assistencia : assaig.assistencia,
      ultima_modificacio: new Date()
    },
    {returnOriginal: false}
  )
  .then(response => {
    res.status(200).json(response)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  })
})

router.get('assajos/:semestreId', (req, res) => {

  const semestreId = req.params.semestreId

  Assaig.find({'semestre': semestreId})
  .populate('assistents')
  .then(assajos => {
    res.status(200).json({ assajos })
  })
  .catch(err => {
    res.status(500).json(err)
  })

})


// ACTUACIONS
router.use('/actuacio', actiuaciomiddleware);

// MUSICS

router.put('/music/desactivar/:id', (req, res) => {
  const id = req.params.id

  if(!id) res.status(400).json({message: 'falta el id'})

  Music.findOneAndUpdate(
    {'_id': id},
    {compte_actiu: false},
    {new: true}
  )
  .then(result => {
    res.status(200).json(result)
  })
  .catch(err => {
    res.status(500).json(err)
  })


})

router.put('/music/activar/:id', (req, res) => {
  const id = req.params.id

  if(!id) res.status(400).json({message: 'falta el id'})

  Music.findOneAndUpdate(
    {'_id': id},
    {compte_actiu: true},
    {new: true}
  )
  .then(result => {
    res.status(200).json(result)
  })
  .catch(err => {
    res.status(500).json(err)
  })


})

router.put('/music/tipo', (req, res) => {

  if(req.body.tipusAnterior === 3 && req.body.tipus === 0) {
    Music.find({})
    .then(musics => {
      let numAdmins = 0
      musics.forEach(music => {
        if(music.tipo_compte === 3)
          numAdmins++
      });

      if(numAdmins === 1) {
        res.status(300).json({
          message: 'no pots realitzar aquesta acció'
        })
        return
      }

    })
    .catch(err => {
      res.status(500).json(err)
    })
  }

  console.log(req.body);

  Music.findOneAndUpdate(
    {'_id': req.body.id},
    {'tipo_compte': req.body.tipus}
  )
  .then(res.status(200).send())
  .catch(err => {
    res.status(500).json(err)
  })
})

router.put('/music', async (req, res) => {
  const music = req.body

  if(music.llista_correu) {
    newsletter.afegirALaLlista(music.mailjet_id);
  } else {
    newsletter.llevarDeLaLlista(music.mailjet_id)
  }

  Music.findOneAndUpdate(
    {'_id': music._id},
    {
      nom: music.nom,
      cognoms: music.cognoms,
      dni: music.dni,
      al: music.al,
      email: music.email,
      telefon: music.telefon,
      corda: music.corda,
      data_naixement: music.data_naixement,
      sexe: music.sexe,
      pais: music.pais,
      llista_correu: music.llista_correu
    },
    {new: true}
  )
  .then(music => {
    res.status(201).json(music)
  })
  .catch(err => {
    res.status(500).json(err)
  })

})

router.get('/musics', (req, res) => {
  Music.find({})
    .then(musics => {
      res.status(200).json({musics})
    })
})

router.get('/musics/:ids', (req, res) => {
  let musicsIds = req.params.ids;

  musicsIds = musicsIds.split(',')
  musicsIds.map(id => {return mongoose.Types.ObjectId(id)})

  Music.find({
    '_id': { $in: musicsIds}
  })
  .then(musics => {
    res.status(200).json({musics})
  })
  .catch(err => {
    console.log(err);
  })
})

router.delete('/music/:id', (req, res) => {
  const id = req.params.id

  if(!id) res.status(400).json({message: 'falta el id'})

  Music.findById(id)
  .then(music => {
    newsletter.eliminarContacte(music.mailjet_id)
  })

  Music.deleteOne({'_id': id})
  .then(result => {
    res.status(200).json(result)
  })
  .catch(err => {
    res.status(500).json(err)
  })

})


module.exports = router;
