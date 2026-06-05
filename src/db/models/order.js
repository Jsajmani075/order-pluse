'use strict'
const { ORDER_STATUS } = require("../../utils/public.constant")

module.exports = function (sequelize, DataTypes) {
  const Order = sequelize.define(
    'Order',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      customerName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      productName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      status: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: ORDER_STATUS.PENDING
      },
    },
    {
      DataTypes,
      tableName: 'orders',
      schema: 'public',
      timestamps: true,
      underscored: true,
      paranoid: false,
    }
  )

  return Order
}
