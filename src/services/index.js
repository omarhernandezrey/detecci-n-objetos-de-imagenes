const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.post('/upload', (req, res) => {
  const { image } = req.body; // Esto es un DataURL de la imagen
  // Aquí deberás procesar la imagen y detectar motocicletas

  console.log('Imagen recibida');
  // Por ahora, solo devolvemos una respuesta de ejemplo
  res.status(200).json({ message: 'Imagen procesada', count: 1 });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
