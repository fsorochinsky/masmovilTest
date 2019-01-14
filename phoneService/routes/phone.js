const express = require('express');
const app = module.exports = express();
const controller = require('../controllers/phone');
const handler = require('../helpers/routeHandler');

app.get('/phones', handler.handle(controller.list));
app.put('/updatePhoneCounts', handler.handle(controller.updateCounts));

