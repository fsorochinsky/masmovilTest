const models = require('../models');
const configToken = require('../config/config').token;

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

function updateCounts(req) {
  let {order, token} = req.body;

  if(configToken !== token ){
    return Promise.reject('wrong token');
  }

  return models.phone.updateItemsCount(order).then((data)=>{
    return Promise.resolve('success');
  });
}

module.exports = {
  list: list,
  updateCounts: updateCounts
};