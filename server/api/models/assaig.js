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
  assistents: [mongoose.Schema.Types.ObjectId],
  assistencia: {type: 'number', default: 0},
  anotacio: {type: 'string'}
}


const Assaig = mongoose.model('assajos', assaigSchema);


module.exports = Assaig
