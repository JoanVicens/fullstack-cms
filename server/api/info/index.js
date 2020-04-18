const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');

const accionsCalendari = require("./accions_calendari");


const router = express.Router();

// const Semestre = require('../models/curs');
const Curs = require('../models/curs');
const Assaig = require('../models/curs');
const Music = require('../models/music');
const Actuacio = require('../models/actuacio');


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
  .then(cursos => {
    res.status(200).json({cursos})
  })
})

router.get('/curs/:id', (req, res) => {

  const id = req.params.id

  Curs.findOne({_id: id})
    .then(cursos => {
      res.status(200).json({cursos})
    })
})

router.get('/curs_actiu', (req, res) => {

  Curs.findOne({curs_actiu: true})
    .then(curs => {
      res.status(200).json({curs})
    })
    .catch(err => console.log(err))
})

router.put('/curs', async (req, res) => {
  const body = req.body;

  // console.log('BODY', body);

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

    console.log('nouCurs', nouCurs);

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

router.post('/assaig', (req, res) => {
  const body = req.body
  const cursId = mongoose.Types.ObjectId(body.cursId);
  const assaigId = mongoose.Types.ObjectId(body.assaigId);

  Curs.updateOne(
    { "_id": cursId, "semestres.semestreId": body.semestreId, "semestres.assajos.assaigId": assaigId },
    {
      $set: {
        "semestres.$[i].assajos.$[j].assistents" :  body.assistents,
        "semestres.$[i].assajos.$[j].assistencia" :  body.assistents.length
      }
    },
    {
      arrayFilters: [
        {"i.semestreId": body.semestreId}, {"j.assaigId": assaigId}
      ]
    }
  ).then(response => {
    res.status(200).json(response)
  })
  .catch(err => {
    console.log(err);
  })
})

router.put('/assaig', (req, res) => {
  const body = req.body;
  const cursId = mongoose.Types.ObjectId(body.cursId);
  let nouAssaig = {
    assaigId: new mongoose.Types.ObjectId(),
    data: body.dia,
    hora_inici: body.hora_inici,
    hora_fi: body.hora_fi,
    anotacio: body.anotacio,
    assistents: []
  };

  Curs.updateOne(
    { "_id": cursId, "semestres.semestreId": body.semestreId },
    {
      $push: {
        "semestres.$.assajos": nouAssaig,
        $sort: {data: 1}
      }
    }
  ).then(response => {
    res.status(200).json(response)
  })
  .catch(err => {
    console.log(err);
  })

})

router.delete('/curs/:assaigId', (req, res) => {

  const assaigId = mongoose.Types.ObjectId(req.params.assaigId);


  Curs.updateOne(
    {"semestres.assajos.assaigId": assaigId},
    {
      $pull: {
        "semestres.$.assajos": { assaigId: assaigId }
      }
    }
  )
  .then(cursos => {
    res.status(200).json({cursos})
  })
  .catch(err => {
    res.status(500).json({err})
  })
})


// ACTUACIONS

router.put('/actuacio', async (req, res) => {
  // NOU CONCERT
  if(!req.body.actuacio) {
    res.status(400)
  }

  console.log(req.body);
  // const semestreId = mongoose.Types.ObjectId(req.body.semestreId);

  const actuacio = req.body.actuacio

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
  })

  novaActuacio.save()
  .then(async result => {
    accionsCalendari.guardarEvent(actuacio)

    Curs.findOneAndUpdate(
      {'semestres.semestreId': req.body.semestreId},
      {
        $push: {
          "semestres.$.actuacions": result._id
        }
      }
    )
    .then(() => {
      res.status(200).json(result)
    })
    .catch(err => {
      console.log(err);
    })

  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  });


})

router.delete('/concert/:id', (req, res) => {
  const concertId = mongoose.Types.ObjectId(req.params.id);

  Curs.findOne(
    {"semestres.concerts.concertId": concertId}
  ).then(curs => {
    let idGoogle = curs.semestres.filter(semes)
    accionsCalendari.eliminarEvent(id)
  })
  .catch(err => {
    console.log(err);
  })

  Curs.updateOne(
    {"semestres.concerts.concertId": concertId},
    {
      $pull: {
        "semestres.$.concerts": { concertId: concertId }
      }
    }
  )
  .then(response => {
    res.status(200).json({response})
  })
  .catch(err => {
    res.status(500).json({err})
  })

})

router.put('/actuacio/assistents', (req, res) => {
  const body = req.body;
  const actuacioId = mongoose.Types.ObjectId(body.actuacioId);

  Actuacio.findOneAndUpdate(
    {'_id': actuacioId},
    {
      $push: {
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

// MUSICS

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


module.exports = router;
