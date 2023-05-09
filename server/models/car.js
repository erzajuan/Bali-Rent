'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class car extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  car.init({
    name: DataTypes.STRING,
    rentPrice: DataTypes.INTEGER,
    plateNumber: DataTypes.STRING,
    fuelType: DataTypes.STRING,
    seatCount: DataTypes.INTEGER,
    carYear: DataTypes.INTEGER,
    brandId: DataTypes.INTEGER,
    transmission: DataTypes.STRING,
    wdType: DataTypes.STRING,
    carImage: DataTypes.STRING,
    status: DataTypes.STRING,
    rendId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'car',
  });
  return car;
};