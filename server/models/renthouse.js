'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class rentHouse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      rentHouse.belongsTo(models.employee)
    }
  }
  rentHouse.init({
    address: DataTypes.STRING,
    employeeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'rentHouse',
  });
  return rentHouse;
};