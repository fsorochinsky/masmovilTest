'use strict';

const promise = require('bluebird');

module.exports = (sequelize, DataTypes) => {
  var Phone = sequelize.define('phone', {
    name: DataTypes.STRING(40),
    img: DataTypes.STRING(255),
    description: DataTypes.TEXT,
    price: DataTypes.FLOAT,
    count: DataTypes.INTEGER
  }, {
    timestamps: false,
    underscored: false
  });

  Phone.updateItemsCount = function(order){
    return sequelize.transaction((t) => {
      // can be improved depends DB and request counts;
      // create one transaction for all user items and revert changes if some of item count is 0 (update by another user)
      return promise.map(order, (item) => {
        return Phone.update(
          {count: sequelize.literal('count - ' + item.count)},
          {
            where: {
              id: item.itemId,
              count: {
                [sequelize.Op.gte]: item.count
              }
            },
            transaction: t
          }
        );
      }, {concurrency: 3}).then((result)=>{
        let errors = [];

        result.forEach((updatedRows, i)=>{
          if(updatedRows[0] === 0){
            errors.push({
              itemId: order[i].itemId,
              message: 'wrong item count. item has been updated'
            });
          }
        });

        if(errors.length){
          return promise.reject({messages:errors});
        }

        return promise.resolve();
      })
    });
  };

  return Phone;
};