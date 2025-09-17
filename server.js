const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

const odunes = require('./data/odun.json'); // Debe incluir combinaciones de cuentas para cada Odù

app.get('/odun', (req, res) => {
  res.json(odunes);
});

app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
