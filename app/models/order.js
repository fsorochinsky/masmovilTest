'use strict';

module.exports = (sequelize, DataTypes) => {
  var Order = sequelize.define('order', {
    status: DataTypes.STRING(10),
    totalPrice: DataTypes.FLOAT,
  }, {
    underscored: false
  });

  Order.associate = function (models) {
    models.order.hasMany(models.orderItem);
  };

  Order.createOrder = function (order) {
    let totalPrice = order.reduce((summ, item) => {
      return summ + item.count * item.price;
    }, 0);
    let createdOrder;

    return Order.create({status: 'success', totalPrice: totalPrice}).then((orderModel) => {
      createdOrder = orderModel.dataValues;

      order.forEach((row) => {
        row.orderId = orderModel.id;
        row.totalPrice = row.count * row.price;
        row.phoneId = row.itemId;
      });

      return sequelize.models.orderItem.bulkCreate(order);
    }).then((createdOrderItems)=>{
      createdOrder.orderItems = createdOrderItems;

      return Promise.resolve(createdOrder);
    })
  };

  return Order;
};