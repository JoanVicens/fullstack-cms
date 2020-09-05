const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//==============================================================================
// MODEL SEMESTRE
//==============================================================================

const semestreSchema = new Schema({
  semestreId: {type: 'string', required: true, unique : true},
  numero: {type: 'number', required: true},
  assajos: [{
    type: mongoose.Types.ObjectId,
    ref: 'assajos'
  }],
  actuacions: [{
    type: mongoose.Types.ObjectId,
    ref: 'actuacions'
  }]
}, {_id: false})

//==============================================================================
// MODEL CURS
//==============================================================================

const cursSchema = new Schema({
  _id: mongoose.Types.ObjectId,
  curs: {type: 'string', required: true, unique: true},
  director: { type: 'string', required: false},
  semestres: [semestreSchema],
  anotacio: {type: 'string', required: false},
  curs_actiu: {type: 'boolean', required: true}
})



const Curs = mongoose.model('cursos', cursSchema);


module.exports = Curs
