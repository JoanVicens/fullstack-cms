var mongoose = require('mongoose')
var validate = require('mongoose-validator')

const nom = [
  validate({
    validator: 'isLength',
    arguments: [3, 50]
  }),
  validate({
    validator: 'isAlphanumeric',
    passIfEmpty: true,
    message: "Nomes s'accepten caracters alphanumèrics"
  })
]

const contrasenya = [
  validate({
    validator: 'isLength',
    arguments: [8, 16],
    message: "La contrasenya ha de tindre un mínim de 8 caracters."
  }),
  validate({
    validator: 'matches',
    arguments: ['^(?=.*[A-Za-z])(?=.*)(?=.*[@$!%*#?&])[A-Za-z@$!%*#?&]{8,}$'] ,
    message: "La contrasenya ha de contindre almenys una lletra, un número i un caràcter especial."
  }),
  validate({
    validator: 'isAlphanumeric',
    passIfEmpty: true,
    message: "Nomes s'accepten caracters alphanumèrics"
  })
]

const musicSchema = new mongoose.Schema({
  nom: { type: 'string', required: true, validate: nom },
  password: { type: 'string', required: true, validate: contrasenya },
  confirm_password: { type: 'string', required: true, validate: contrasenya }
})


export default musicSchema
