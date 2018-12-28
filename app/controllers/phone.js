const models = require('../models');

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

module.exports = {
  list: list
};