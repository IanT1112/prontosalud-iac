const express = require('express');
const router = express.Router();
const Emergencia = require('../models/Emergencia');

// CREAR EMERGENCIA
router.post('/', async (req, res) => {
  try {
    const emergencia = new Emergencia(req.body);
    await emergencia.save();
    res.json(emergencia);
  } catch (err) {
    res.status(400).json({ error: 'Error al crear emergencia' });
  }
});

// OBTENER EMERGENCIAS ACTIVAS
router.get('/', async (req, res) => {
  try {
    const emergencias = await Emergencia.find({ estado: 'activa' }).populate('pacienteId');
    res.json(emergencias);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener emergencias' });
  }
});

// ACTUALIZAR ESTADO DE EMERGENCIA
router.put('/:id', async (req, res) => {
  try {
    const emergencia = await Emergencia.findByIdAndUpdate(
      req.params.id,
      { estado: req.body.estado },
      { new: true }
    );
    res.json(emergencia);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar emergencia' });
  }
});

module.exports = router;