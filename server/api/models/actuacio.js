const mongoose = require('mongoose');

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


const Actucio = mongoose.model('actuacions', actuacioSchema);

module.exports = Actucio
