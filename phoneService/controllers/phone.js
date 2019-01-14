const models = require('../models');
const configToken = require('../config/config').token;
const validation = require('../validations/order');

/**
 *
 * @param req
 * @returns {Promise<Array<{
 *    id: 29,
 *    name: 'phone name 28',
 *    img: 'http://someUrl.com/img/phone28.img',
 *    description: 'phone description 28',
 *    price: 92,
 *    count: 6 ,
 *
 * }>>}
 */
function list(req) {
  return models.phone.findAll();
}

/**
 *
 * @param req
 * @returns {Promise<createdOrder>}
 * {
 *
 * }
 *
 */
async function updateCounts(req) {
  let {order, token} = req.body;

  if(configToken !== token ){
    return Promise.reject('wrong token');
  }

  await validation.baseOrderItemsValidation(order);

  let phones = await models.phone.findAll();

  await validation.orderItemValidation(order, phones);

  order = setPrice(order, phones);

  return models.phone.updateItemsCount(order).then(()=>{
    return Promise.resolve(order);
  });
}

module.exports = {
  list: list,
  updateCounts: updateCounts
};

function setPrice(order, phones){
  let phoneObj = {};

  phones.forEach((phone) => {
    phoneObj[phone.id] = phone;
  });

  order.forEach((orderItem) => {
    orderItem.price = phoneObj[orderItem.phoneId].price;
  });

  return order;
}