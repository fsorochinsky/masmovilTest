const promise = require('bluebird');

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
  orderItem.count = orderItem.count | 0;

  if (!phone) {
    error.itemId = orderItem.itemId;
    error.message = 'wrong item';
  } else if (!orderItem.count || phone.count < orderItem.count) {
    error.itemId = orderItem.itemId;
    error.message = 'wrong item count. max item count is ' + phone.count;
  }

  return error.itemId ? error : null;
}

module.exports = {
  baseOrderValidation: baseOrderValidation,
  orderItemValidation: orderItemValidation
};