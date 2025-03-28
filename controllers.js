const db = require('./database');
const ApiError = require('./utils/ApiError');
const httpStatus = require('http-status');

const getIncidents = async (req, res, next) => {
  try {
    const { status, equipment_type, priority, from, to } = req.query;
    let sql = `SELECT * FROM incidents WHERE 1=1`;
    const params = [];

    // Filtros dinámicos
    if (status) {
      sql += ` AND status = ?`;
      params.push(status);
    }
    if (equipment_type) {
      sql += ` AND equipment_type = ?`;
      params.push(equipment_type);
    }
    if (priority) {
      sql += ` AND priority = ?`;
      params.push(priority);
    }
    if (from && to) {
      sql += ` AND created_at BETWEEN ? AND ?`;
      params.push(from, to);
    }

    sql += ` ORDER BY 
      CASE priority 
        WHEN 'alta' THEN 1 
        WHEN 'media' THEN 2 
        WHEN 'baja' THEN 3 
      END, created_at DESC`;

    const incidents = await db.all(sql, params);
    res.json(incidents);
  } catch (err) {
    next(new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error al obtener incidentes'));
  }
};

const createIncident = async (req, res, next) => {
  try {
    const { reporter, equipment_type, description, priority = 'media' } = req.body;
    
    const result = await db.run(
      `INSERT INTO incidents (reporter, equipment_type, description, priority) 
       VALUES (?, ?, ?, ?)`,
      [reporter, equipment_type, description, priority]
    );

    const newIncident = await db.get(
      `SELECT * FROM incidents WHERE id = ?`, 
      [result.lastID]
    );

    res.status(httpStatus.CREATED).json(newIncident);
  } catch (err) {
    next(new ApiError(httpStatus.BAD_REQUEST, 'Error al crear incidente'));
  }
};

// Resto de controladores...

module.exports = {
  getIncidents,
  createIncident,
  getIncidentById,
  updateIncident,
  deleteIncident,
  getIncidentStats
};