'use strict';

function getRandom(min, max){
  return Math.round(Math.random() * (max - min) + min);
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    let phones = [];

    for(var i = 0; i < 30; i++){
      phones.push({
        name: 'phone name ' + i,
        description: 'phone description ' + i,
        img: 'http://someUrl.com/img/phone'+i+'.img',
        count: getRandom(2,10),
        price: getRandom(20,100)
      });
    }

    return queryInterface.bulkInsert('phones', phones, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('phones', null, {});
  }
};
