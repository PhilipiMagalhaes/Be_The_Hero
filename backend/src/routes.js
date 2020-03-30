const express = require('express');
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const SessionController = require('./controllers/SessionController');
const routes = express.Router();

//Routes ONGS
routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

//Routes Incidents
routes.post('/incidents', IncidentController.create);
routes.get('/incidents', IncidentController.index);
routes.delete('/incidents/:id', IncidentController.delete);

//Routes Sessions
routes.post('/session', SessionController.create);

module.exports = routes; 