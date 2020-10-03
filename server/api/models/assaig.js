const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//==============================================================================
// MODEL ASSAIG
//==============================================================================

const assaigSchema = new Schema({
  _id: mongoose.Types.ObjectId,
  data: {type: 'date', required: true},
  hora_inici: {type: 'string'},
  hora_fi: {type: 'string'},
  assistents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'musics'
  }],
  lloc: {type: 'string'},
  anotacio: {type: 'string'},
  calendar_event: {type: 'boolean'},
  ultima_modificacio: {type: 'date'},
  semestre: {type: 'string'}
})


const Assaig = mongoose.model('assajos', assaigSchema);


module.exports = Assaig
