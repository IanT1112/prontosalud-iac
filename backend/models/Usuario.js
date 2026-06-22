const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
  nombre: String,
  email: { type: String, unique: true },
  password: String,
  rol: { type: String, enum: ['paciente', 'ambulancia'], default: 'paciente' }
});

module.exports = mongoose.model('Usuario', UsuarioSchema);