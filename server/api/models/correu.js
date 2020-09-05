const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const correuSchema = new Schema({
    _id: mongoose.Types.ObjectId,
    data: {type: 'date', required: true},
    assumpte: {type: 'string', required: true},
    html: {type: 'string', required: true},
    adjunts: [],
    marcat: {type: 'boolean'}
})


const Correu = mongoose.model('correus', correuSchema);


module.exports = Correu
