'use strict';

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('user', {
    name: DataTypes.STRING(40),
    surName: DataTypes.STRING(50),
    email: DataTypes.STRING(120)
  }, {
    timestamps: false,
    underscored: false
  });

  return User;
};