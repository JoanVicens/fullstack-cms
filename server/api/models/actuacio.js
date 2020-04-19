const mongoose = require('mongoose');

const Curs = require('./curs.js');


const Schema = mongoose.Schema;
// const Semestre = require('../models/curs');

//==============================================================================
// MODEL CONCERT
//==============================================================================
const actuacioSchema = new Schema({
  titol: {type: 'string', required: true},
  data: {type: 'date', required: false},
  hora_inici: {type: 'string'},
  hora_fi: {type: 'string'},
  lloc: {type: 'string'},
  repertori: [String],
  descripcio: {type: 'string'},
  assistents: [{
    type: mongoose.Types.ObjectId,
    ref: 'musics'
  }],
  event_id: {type: 'string'}
})

actuacioSchema.post('deleteOne', (actuacio) => {
  const actuacioId = mongoose.Types.ObjectId(actuacio._id);
  // console.log('actuacioId: ', actuacioId);


  // Curs.find({'semestres.actuacions': actuacioId})
  // .then(result => console.log('find: ', result))
  // .catch(err => console.log(err))

  // Curs.findOneAndUpdate(
  //   {'semestres.actuacions': actuacioId},
  //   {
  //     $pull: {
  //       'semetres.$.actuacions': actuacioId
  //     }
  //   }
  // )
})


const Actucio = mongoose.model('actuacions', actuacioSchema);

module.exports = Actucio
