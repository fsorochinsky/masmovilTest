const models = require('../models');

function getUser(req) {
  // should be search by session
  return models.user.find({where: {email: req.body.email}});
}

module.exports = {
  getUser: getUser
};