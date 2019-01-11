const express = require('express');
const app = module.exports = express();
const controller = require('../controllers/phone');
const handler = require('../helpers/routeHandlere');

app.get('/phones', handler.handle(controller.list));
app.post('/updatePhoneCounts', handler.handle(controller.updateCounts));

