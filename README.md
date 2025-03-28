# API de Gestión de Incidentes (Tickets) 🚨

![Node.js](https://img.shields.io/badge/Node.js-16%2B-green)
![Express](https://img.shields.io/badge/Express-4.x-blue)
![SQLite](https://img.shields.io/badge/SQLite-3-lightgrey)
![Swagger](https://img.shields.io/badge/Swagger-3.0-yellow)

API completa para el sistema de tickets de soporte técnico, con autenticación JWT, documentación Swagger y base de datos SQLite.

## Características principales ✨

- ✅ CRUD completo para incidentes
- ✅ Filtros avanzados (estado, prioridad, fechas)
- ✅ Validación de datos robusta
- ✅ Documentación interactiva con Swagger UI
- ✅ Sistema de autenticación JWT (opcional)
- ✅ Logs detallados
- ✅ Ready para Docker

## Requisitos previos 📋

- Node.js 16+
- npm 8+
- SQLite3
- Git (opcional)

## Instalación 🛠️

1. Clonar el repositorio:
```bash
git clone https://github.com/tu-usuario/incident-management-api.git
cd incident-management-api

Instalar dependencias:

bash
Copy
npm install
Configurar entorno (copiar y editar):

bash
Copy
cp .env.example .env
Configuración ⚙️
Edita el archivo .env con tus valores:

ini
Copy
PORT=3000
NODE_ENV=development
JWT_SECRET=tu_secreto_super_seguro
DB_FILENAME=./data/incidents.db
LOG_LEVEL=info
Uso 🚀
Modo desarrollo (con nodemon):

bash
Copy
npm run dev
Modo producción:

bash
Copy
npm start
Generar datos de prueba:

bash
Copy
npm run seed
