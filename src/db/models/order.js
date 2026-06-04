'use strict'
import { GENDER } from '@src/utils/constants/public.constants'

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
      customer_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      product_name: {
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
