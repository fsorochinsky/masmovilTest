'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING(40),
        allowNull: false,
      },
      surName: {
        type: Sequelize.STRING(40),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(120),
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        default: Sequelize.TIMESTAMP
      },
      updatedAt: {
        type: Sequelize.DATE,
        default: Sequelize.TIMESTAMP
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};
