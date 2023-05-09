'use strict';
const {
  Model
} = require('sequelize');
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
    }
  }
  order.init({
    orderDate: DataTypes.DATE,
    startDate: DataTypes.DATE,
    finishDate: DataTypes.DATE,
    carId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    rentId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'order',
  });
  return order;
};