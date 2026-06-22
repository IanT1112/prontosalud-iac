const express = require('express');
const router = express.Router();
const Paciente = require('../models/Paciente');

// CREAR PACIENTE
router.post('/', async (req, res) => {
  try {
    const paciente = new Paciente(req.body);
    await paciente.save();
    res.json(paciente);
  } catch (err) {
    res.status(400).json({ error: 'Error al crear paciente' });
  }
});

// OBTENER TODOS LOS PACIENTES
router.get('/', async (req, res) => {
  try {
    const pacientes = await Paciente.find();
    res.json(pacientes);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener pacientes' });
  }
});

// OBTENER UN PACIENTE POR ID
router.get('/:id', async (req, res) => {
  try {
    const paciente = await Paciente.findById(req.params.id);
    if (!paciente) return res.status(404).json({ error: 'Paciente no encontrado' });
    res.json(paciente);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener paciente' });
  }
});

module.exports = router;