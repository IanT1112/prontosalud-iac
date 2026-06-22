const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
const Paciente = require('../models/Paciente');

// REGISTRO
router.post('/register', async (req, res) => {
  try {
    const { nombre, email, password, rol, celular, edad, direccion } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const usuario = new Usuario({ nombre, email, password: passwordHash, rol });
    await usuario.save();

    // Crear paciente vinculado al usuario
    const paciente = new Paciente({
      usuarioId: usuario._id,
      nombre,
      edad: edad || 0,
      direccion: direccion || '',
      telefono: celular || '',
    });
    await paciente.save();

    res.json({ mensaje: 'Usuario creado correctamente', pacienteId: paciente._id });
  } catch (err) {
    res.status(400).json({ error: 'Error al registrar usuario' });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const usuario = await Usuario.findOne({ email });
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    const valido = await bcrypt.compare(password, usuario.password);
    if (!valido) return res.status(401).json({ error: 'Contraseña incorrecta' });

    // Buscar paciente vinculado
    const paciente = await Paciente.findOne({ usuarioId: usuario._id });

    const token = jwt.sign({ id: usuario._id, rol: usuario.rol }, process.env.JWT_SECRET);
    res.json({
      token,
      rol: usuario.rol,
      nombre: usuario.nombre,
      pacienteId: paciente ? paciente._id : null
    });
  } catch (err) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

module.exports = router;