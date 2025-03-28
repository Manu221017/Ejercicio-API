const express = require('express');
const router = express.Router();
const {
  validateCreateIncident,
  validateUpdateIncident,
  validateIdParam
} = require('./validators');
const {
  getIncidents,
  createIncident,
  getIncidentById,
  updateIncident,
  deleteIncident,
  getIncidentStats
} = require('./controllers');

router.route('/')
  .get(getIncidents)
  .post(validateCreateIncident, createIncident);

router.route('/stats')
  .get(getIncidentStats);

router.route('/:id')
  .all(validateIdParam)
  .get(getIncidentById)
  .put(validateUpdateIncident, updateIncident)
  .delete(deleteIncident);

module.exports = router;