const mongoose = require('mongoose');

const EmergenciaSchema = new mongoose.Schema({
  pacienteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Paciente' },
  estado: { type: String, enum: ['activa', 'en_camino', 'atendida'], default: 'activa' },
  ubicacion: {
    latitud: Number,
    longitud: Number
  },
  creadaEn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Emergencia', EmergenciaSchema);