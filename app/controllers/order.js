const models = require('../models');
const phoneServerUrl = require('../config/config').phoneServerUrl;
const axios = require('axios');
const promise = require('bluebird');
const validation = require('../validations/order');
const userCtrl = require('./user');

/**
 *
 * @param req
 * @returns {PromiseLike<Promise>}
 *
 * order should has structure:
 * [
 *  {
 *    itemId:1,
 *    count:2
 *  }
 * ]
 *
 */
async function create(req) {
  let order = req.body;

  await validation.baseOrderValidation(order);

  let phoneResponse = await axios.get(phoneServerUrl + '/phones');
  let phones = phoneResponse.data;

  let user = await userCtrl.getUser({body: {email: 'test@test.net'}});

  await validation.orderItemValidation(order, phones);
  // maybe will need to move this functionality to phone controller and use by axios (HTTP request) like "get phone"
  await models.phone.updateItemsCount(order);

  let createdOrder = await models.order.createOrder(order, user.id);

  logOrder(createdOrder);

  return promise.resolve(createdOrder);
}

async function list(req) {
  let phoneResponse = await axios.get(phoneServerUrl + '/phones');
  let phones = phoneResponse.data;

  let orders = await models.order.findAll({
    include: [{
      model: models.user
    }, {
      model: models.orderItem
    }]
  });

  return promise.resolve(attachPhones(orders, phones));
}

module.exports = {
  create: create,
  list: list
};

function attachPhones(orders, phones) {
  let objectPhones = phones.reduce((obj, phone) => {
    obj[phone.id] = phone;

    return obj;
  }, {});

  orders.forEach((order) => {
    order.orderItems.forEach((item, i) => {
      item.phone = objectPhones[item.phoneId];
    });
  });

  return orders;
}

function logOrder(order) {
  // get order item values instead model
  order.orderItems.forEach((item, i) => {
    order.orderItems[i] = item.dataValues;
  });

  console.log(order);
}