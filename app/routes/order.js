const express = require('express');
const app = module.exports = express();
const controller = require('../controllers/order');
const handler = require('../helpers/routeHandler');

app.put('/order', handler.handle(controller.create));

app.get('/orders', handler.handle(controller.list));