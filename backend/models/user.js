'use strict';

const { Model, DataTypes } = require('sequelize');
const { ROLE } = require('../utils/constants');

module.exports = (sequelize) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.products);
      User.hasOne(models.carts);
    }
  }

  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM(Object.values(ROLE)),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );

  return User;
};
