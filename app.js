const express = require('express');
const bodyParser = require('body-parser');
const incidentsRoutes = require('./routes/incidents');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use('/incidents', incidentsRoutes);

app.listen(PORT, () => {
  console.log(`API de incidentes corriendo en http://localhost:${PORT}`);
});
