const mongoose = require('mongoose');

const PacienteSchema = new mongoose.Schema({
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
  nombre: String,
  edad: Number,
  direccion: String,
  telefono: String,
  historial: {
    alergias: [String],
    condiciones: [String],
    medicamentos: [String],
    observaciones: String,
    resumenIA: String
  }
});

module.exports = mongoose.model('Paciente', PacienteSchema);