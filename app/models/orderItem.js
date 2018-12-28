'use strict';
module.exports = (sequelize, DataTypes) => {
  var OrderItem = sequelize.define('orderItem', {
    orderId: DataTypes.INTEGER,
    phoneId: DataTypes.INTEGER,
    count: DataTypes.INTEGER,
    price: DataTypes.FLOAT,
    totalPrice: DataTypes.FLOAT
  }, {
    underscored: false
  });

  OrderItem.associate = function (models) {
    models.orderItem.belongsTo(models.order);
    models.orderItem.belongsTo(models.phone);
  };

  return OrderItem;
};