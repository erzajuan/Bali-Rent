const { encrypt } = require("../services/bcrypt");
("use strict");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.hasMany(models.order);
    }
  }
  user.init(
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Nama Tidak Boleh Kosong",
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
          isEmail: {
            msg: "E-mail Tidak Valid"
          },
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
      profilePicture: DataTypes.STRING,
    },
    {
      hooks: {
        beforeCreate: function (user, options) {
          user.password = encrypt(user.password);
        },
      },
      sequelize,
      modelName: "user",
    }
  );
  return user;
};
