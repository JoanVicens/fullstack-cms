const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');

const calendari = require("./calendari");

const router = express.Router();

const Curs = require('../models/curs');
const Assaig = require('../models/assaig');
const Music = require('../models/music');
const Actuacio = require('../models/actuacio');


router.use((req, res, next) => {
  if(req.session.session_id) {
    console.log(req.session.session_id);
    Music.findOne({'session_id': req.session.session_id})
    .then(() => {
      next();
    })
    .catch(err => {
      res.status(500)
    });
  } else {
    console.log('no id')
    res.status(400).json({message: 'notAuthorized'})
  }
})

// CURS

router.get('/cursos', (req, res) => {
  Curs.find({})
  .populate({
    path:'semestres.actuacions',
    populate: {
      path: 'assistents',
      select: 'nom cognoms instrument'
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
      select: 'nom cognoms instrument'
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

router.get('/actuacions/actiu', (req, res) => {

  Curs.findOne({'curs_actiu': true})
  .populate({path:'semestres.actuacions'})
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

router.put('/actuacio', async (req, res) => {
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

router.delete('/actuacio/:id', (req, res) => {
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

router.put('/actuacio/assistents', (req, res) => {
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

router.put('/actuacio/afegir/assistent', (req, res) => {
  const body = req.body;
  const idActuacio = mongoose.Types.ObjectId(body.idActuacio);
  //
  // console.log(actuacioId);

  console.log(body.idActuacio);

  Actuacio.findById(idActuacio)
  .then(response => {
    console.log(response);
  })
  .catch(err => {
    console.log(err);
  })

  Actuacio.findOneAndUpdate(
    {'_id': idActuacio},
    {
      $push: {
        "assistents": body.idAssistent
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

router.put('/actuacio/llevar/assistent', (req, res) => {
  const body = req.body;
  const idActuacio = mongoose.Types.ObjectId(body.idActuacio);
  const idAssistent = mongoose.Types.ObjectId(body.idAssistent);

  Actuacio.findOne(
    { 'semestres.actuacions': idActuacio }
  )
  .then(actuacio => {

    let index = actuacio.assistents.indexOf(body.idActuacio)
    actuacio.assistents.splice(index, 1)

    actuacio.save()
    .then(result => {
      console.log("S'ha actualitzat la assistencia de %s", actuacio.titol);
    })
    .catch(err => console.log(err))
  })
  .catch(err => {
    console.log(err);
  })
})

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

router.put('/music', (req, res) => {
  const music = req.body

  Music.findOneAndUpdate(
    {'_id': music._id},
    {
      nom: music.nom,
      cognoms: music.cognoms,
      dni: music.dni,
      al: music.al,
      email: music.email,
      telefon: music.telefon,
      instrument: music.instrument,
      data_naixement: music.data_naixement,
      sexe: music.sexe,
      pais: music.pais
    }
  )
  .then(music => {
    console.log(music);
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

  Music.deleteOne({'_id': id})
  .then(result => {
    res.status(200).json(result)
  })
  .catch(err => {
    res.status(500).json(err)
  })
})


module.exports = router;
