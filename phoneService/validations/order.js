const promise = require('bluebird');

// can be used some validation package
function baseOrderItemsValidation(order) {
  let errors = [];

  if (!order || !order.length) {
    return promise.reject({
      messages: [{
        phoneId: '',
        message: 'order is empty'
      }]
    });
  }

  order.forEach((orderItem) => {
    if (!orderItem.phoneId || !orderItem.count) {
      errors.push({
        phoneId: orderItem.phoneId || '',
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
  let phone = phoneObj[orderItem.phoneId];
  let error = {};
  orderItem.count = orderItem.count | 0;

  if (!phone) {
    error.phoneId = orderItem.phoneId;
    error.message = 'wrong item';
  } else if (!orderItem.count || phone.count < orderItem.count) {
    error.phoneId = orderItem.phoneId;
    error.message = 'wrong item count. max item count is ' + phone.count;
  }

  return error.phoneId ? error : null;
}

module.exports = {
  baseOrderItemsValidation: baseOrderItemsValidation,
  orderItemValidation: orderItemValidation
};