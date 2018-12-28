'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('orderItems', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      orderId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'orders',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      phoneId:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'phones',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      count:{
        type:Sequelize.INTEGER,
        allowNull: false,
      },
      price:{
        type:Sequelize.FLOAT,
        allowNull: false,
      },
      totalPrice:{
        type:Sequelize.FLOAT,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        default: Sequelize.TIMESTAMP
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        default: Sequelize.TIMESTAMP
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('orderItems');
  }
};
