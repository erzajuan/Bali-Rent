"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class car extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      car.hasOne(models.order);
      car.belongsTo(models.brand);
      car.belongsTo(models.rentHouse);
    }
  }
  car.init(
    {
      name: {
        type: DataTypes.STRING,
        validate: { notEmpty: { msg: "Name Tidak Boleh Kosong" } },
      },
      rentPrice: {
        type: DataTypes.INTEGER,
        validate: { notEmpty: { msg: "Rent Price Tidak Boleh Kosong" } },
      },
      plateNumber: {
        type: DataTypes.STRING,
        validate: { notEmpty: { msg: "Plate Number Tidak Boleh Kosong" } },
      },
      fuelType: {
        type: DataTypes.STRING,
        validate: { notEmpty: { msg: "Fuel Type Tidak Boleh Kosong" } },
      },
      seatCount: {
        type: DataTypes.INTEGER,
        validate: { notEmpty: { msg: "Seat Count Tidak Boleh Kosong" } },
      },
      carYear: {
        type: DataTypes.INTEGER,
        validate: { notEmpty: { msg: "Car Year Tidak Boleh Kosong" } },
      },
      brandId: {
        type: DataTypes.INTEGER,
        validate: { notEmpty: { msg: "Brand ID Tidak Boleh Kosong" } },
      },
      transmission: {
        type: DataTypes.STRING,
        validate: { notEmpty: { msg: "Transmission Tidak Boleh Kosong" } },
      },
      wdType: {
        type: DataTypes.STRING,
        validate: { notEmpty: { msg: "WD Type Tidak Boleh Kosong" } },
      },
      carImage: DataTypes.STRING,
      status: DataTypes.STRING,
      rentHouseId: {
        type: DataTypes.INTEGER,
        validate: { notEmpty: { msg: "Rent House ID Tidak Boleh Kosong" } },
      },
    },
    {
      hooks: {
        beforeCreate: function (car, options) {
          car.status = "Available";
        },
      },
      sequelize,
      modelName: "car",
    }
  );
  return car;
};
