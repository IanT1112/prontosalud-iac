const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/pacientes', require('./routes/pacientes'));
app.use('/api/emergencias', require('./routes/emergencias'));

// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB conectado'))
  .catch(err => console.log('❌ Error:', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚑 Servidor corriendo en puerto ${PORT}`));