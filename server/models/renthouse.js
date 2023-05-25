"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class rentHouse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      rentHouse.belongsTo(models.employee);
      rentHouse.hasMany(models.order);
    }
  }
  rentHouse.init(
    {
      address: {
        type: DataTypes.STRING,
        validate: { notEmpty: { msg: "Adress Tidak Boleh Kosong" } },
      },
      employeeId: {
        type: DataTypes.INTEGER,
        validate: { notEmpty: { msg: "Employee ID Tidak Boleh Kosong" } },
      },
    },
    {
      sequelize,
      modelName: "rentHouse",
    }
  );
  return rentHouse;
};
