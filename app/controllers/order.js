const models = require('../models');
const phoneServerUrl = require('../config/config').phoneServerUrl;
const axios = require('axios');
const promise = require('bluebird');

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

  return baseOrderValidation(order).then(() => {
    return axios.get(phoneServerUrl + '/phones')
  }).then((response) => {
    phones = response.data;

    return orderItemValidation(order, phones);
  }).then(() => {
    // maybe will need to move this functionality to phone controller and use by axios (HTTP request) like "get phone"
    return models.phone.updateItemsCount(order);
  }).then(()=>{
    return models.order.createOrder(order);
  });
}

module.exports = {
  create: create
};

// can be used some validation package
function baseOrderValidation(order) {
  let errors = [];

  if (!order || !order.length) {
    return promise.reject({
      messages: [{
        itemId: '',
        message: 'order is empty'
      }]
    });
  }

  order.forEach((orderItem) => {
    if (!orderItem.itemId || !orderItem.count) {
      errors.push({
        itemId: orderItem.itemId || '',
        message: 'wrong item or count'
      });
    }
  });

  if (errors.length) {
    return promise.reject({
      messages: errors
    });
  }

  return promise.resolve();
}

function orderItemValidation(order, phones) {
  let phoneObj = {};
  let errors = [];

  phones.forEach((phone) => {
    phoneObj[phone.id] = phone;
  });

  order.forEach((orderItem) => {
    let error = isValidItem(orderItem, phoneObj);

    orderItem.price = phoneObj[orderItem.itemId].price;

    !!error && errors.push(error);
  });

  if (errors.length) {
    return promise.reject({
      messages: errors
    });
  }

  return promise.resolve();
}

function isValidItem(orderItem, phoneObj) {
  let phone = phoneObj[orderItem.itemId];
  let error = {};
  orderItem.count = orderItem.count|0;

  if (!phone) {
    error.itemId = orderItem.itemId;
    error.message = 'wrong item';
  } else if (!orderItem.count || phone.count < orderItem.count) {
    error.itemId = orderItem.itemId;
    error.message = 'wrong item count. max item count is ' + phone.count;
  }

  return error.itemId ? error : null;
}