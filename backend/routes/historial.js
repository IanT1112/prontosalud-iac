const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const OpenAI = require('openai');
const Paciente = require('../models/Paciente');

const upload = multer({ dest: 'uploads/' });
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post('/:pacienteId', upload.single('pdf'), async (req, res) => {
  try {
    console.log('📄 Archivo recibido:', req.file);
    
    if (!req.file) {
      return res.status(400).json({ error: 'No se recibió archivo' });
    }

    const pdfBuffer = fs.readFileSync(req.file.path);
    const base64PDF = pdfBuffer.toString('base64');

    console.log('🤖 Enviando a OpenAI...');

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: `Eres un asistente médico. Resume este historial clínico de forma clara y concisa para un paramédico que llega a una emergencia. Extrae y organiza: alergias, condiciones médicas, medicamentos actuales, y observaciones importantes. Sé breve y directo.`
            },
            {
              type: 'image_url',
              image_url: {
                url: `data:application/pdf;base64,${base64PDF}`
              }
            }
          ]
        }
      ]
    });

    const resumen = response.choices[0].message.content;
    console.log('✅ Resumen generado:', resumen);

    await Paciente.findByIdAndUpdate(req.params.pacienteId, {
      'historial.resumenIA': resumen
    });

    fs.unlinkSync(req.file.path);

    res.json({ resumen });
  } catch (err) {
    console.error('❌ Error en historial:', err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;