"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      order.belongsTo(models.user);
      order.belongsTo(models.rentHouse);
      order.belongsTo(models.car);
    }
  }
  order.init(
    {
      orderDate: {
        type: DataTypes.DATE,
        validate: { notEmpty: { message: "Order Date Tidak Boleh Kosong" } },
      },
      startDate: {
        type: DataTypes.DATE,
        validate: { notEmpty: { message: "Start Date Tidak Boleh Kosong" } },
      },
      finishDate: {
        type: DataTypes.DATE,
        validate: { notEmpty: { message: "Fnish Date Tidak Boleh Kosong" } },
      },
      carId: {
        type: DataTypes.INTEGER,
        validate: { notEmpty: { message: "Car ID Tidak Boleh Kosong" } },
      },
      userId: {
        type: DataTypes.INTEGER,
        validate: { notEmpty: { message: "User ID Tidak Boleh Kosong" } },
      },
      rentHouseId: {
        type: DataTypes.INTEGER,
        validate: { notEmpty: { message: "Rent House ID Tidak Boleh Kosong" } },
      },
      paymentId: {
        type: DataTypes.STRING,
      },
      transactionStatus: {
        type: DataTypes.STRING,
      },
      responseMidtrans: {
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: "order",
    }
  );
  return order;
};
