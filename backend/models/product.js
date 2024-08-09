'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.User, {
        foreignKey: 'userId',
      });
      Product.belongsTo(models.Cart, {
        foreignKey: 'cartId',
      });
    }
  }

  Product.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      cartId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'carts',
          key: 'id',
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
      },
      category: {
        type: DataTypes.STRING,
      },
      discount: {
        type: DataTypes.DECIMAL(10, 2),
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: true,
      modelName: 'Product',
      tableName: 'products',
    }
  );

  return Product;
};
