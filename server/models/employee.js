const { encrypt } = require("../services/bcrypt");
("use strict");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      employee.hasOne(models.rentHouse)
    }
  }
  employee.init(
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Name Tidak Boleh Kosong",
          },
        },
      },
      username: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Username Tidak Boleh Kosong",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "E-mail Tidak Boleh Kosong",
          },
          isEmail: {msg : "E-mail Tidak Valid"}
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Password Tidak Boleh Kosong",
          },
        },
      },
      phoneNumber: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Phone Number Tidak Boleh Kosong",
          },
        },
      },
      role: DataTypes.STRING ,
    },
    {
      hooks: {
        beforeCreate: function (employee, options) {
          if(employee.role !== undefined){
            employee.password = encrypt(employee.password);
          }
          else{
            employee.password = encrypt(employee.password);
            employee.role = "renter"
          }
        },
      },
      sequelize,
      modelName: "employee",
    }
  );
  return employee;
};
