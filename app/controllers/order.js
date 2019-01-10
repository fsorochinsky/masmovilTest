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
function create(req) {
  let order = req.body;
  let phones;
  let user;

  return validation.baseOrderValidation(order).then(() => {
    return axios.get(phoneServerUrl + '/phones');
  }).then((response) => {
    phones = response.data;

    return userCtrl.getUser({body: {email: 'test@test.net'}});
  }).then((response) => {
    user = response;

    return validation.orderItemValidation(order, phones);
  }).then(() => {
    // maybe will need to move this functionality to phone controller and use by axios (HTTP request) like "get phone"
    return models.phone.updateItemsCount(order);
  }).then(() => {
    return models.order.createOrder(order, user.id);
  }).then((result) => {
    logOrder(result);

    return promise.resolve();
  })
}

function list(req) {
  let phones;

  return axios.get(phoneServerUrl + '/phones').then((response) => {
    phones = response.data;

    return models.order.findAll({
      include: [{
        model: models.user
      }, {
        model: models.orderItem
      }]
    });
  }).then((response) => {
    return promise.resolve(attachPhones(response, phones));
  });
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