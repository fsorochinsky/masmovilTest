'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let users = [{
      name: 'user name',
      surName: 'user surName',
      email: 'test@test.net'
    }];

    return queryInterface.bulkInsert('users', users, {}).catch((err)=>{
      return Promise.reject(err);
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.delete('users', {where: {email: 'test@test.net'}}, {});
  }
};
