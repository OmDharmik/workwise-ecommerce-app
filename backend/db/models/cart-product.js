'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class CartProducts extends Model {}

  CartProducts.init(
    {
      cartId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'carts',
          key: 'id',
        },
        allowNull: false,
      },
      productId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'products',
          key: 'id',
        },
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'CartProducts',
      tableName: 'cart_products',
      timestamps: true,
    }
  );

  return CartProducts;
};
