const mongoose = require('mongoose');

const Curs = require('./curs.js');


const Schema = mongoose.Schema;
// const Semestre = require('../models/curs');

//==============================================================================
// MODEL CONCERT
//==============================================================================
const actuacioSchema = new Schema({
  _id: mongoose.Types.ObjectId,
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
  calendar_event: {type: 'boolean'}
})

const Actucio = mongoose.model('actuacions', actuacioSchema);

module.exports = Actucio
