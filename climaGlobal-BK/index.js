const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Permite peticiones desde tu frontend y entiende formato JSON
app.use(cors());
app.use(express.json());

// Ruta de prueba para datos del clima
app.get('/api/clima', (req, res) => {
  res.json([
    { anio: 1991, temperaturaPromedio: 14.5 },
    { anio: 1992, temperaturaPromedio: 14.2 }
  ]);
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
