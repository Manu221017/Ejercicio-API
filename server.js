const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const config = require('./config');
const db = require('./database');
const routes = require('./routes');
const { errorHandler } = require('./middleware');

const app = express();

// Configuración de middlewares
app.use(cors(config.corsOptions));
app.use(helmet());
app.use(express.json({ limit: '10kb' }));
app.use(morgan('combined'));

// Limitar peticiones
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // límite por IP
});
app.use(limiter);

// Documentación Swagger
const swaggerDocument = YAML.load('./swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rutas
app.use('/api/v1', routes);

// Manejo de errores
app.use(errorHandler);

// Manejo de cierre elegante
process.on('SIGTERM', async () => {
  await db.close();
  process.exit(0);
});

process.on('SIGINT', async () => {
  await db.close();
  process.exit(0);
});

module.exports = app;