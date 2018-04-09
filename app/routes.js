// create a new express router
const express = require('express');
const router = express.Router();
const mainController = require('./controllers/main.controller');
const eventsController = require('./controllers/events.controller');

//export router
module.exports = router;

//define routes
//main routes
router.get('/', mainController.showHome);

//event routes
router.get('/events', eventsController.showEvents);
