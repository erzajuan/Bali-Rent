const { user, order } = require("../models");
const { generateTokenUser, verifToken } = require("../services/auth");
const { decrypt, encrypt } = require("../services/bcrypt");

class UserControlelr {
  static async getUsers(req, res) {
    try {
      let result = await user.findAll({ include: [order] });
      res.status(200).json({
        status: true,
        message: "Berhasil mendapatkan data",
        data: result,
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: "Gagal mendapatkan data",
        error: error,
      });
    }
  }

  static async register(req, res) {
    try {
      const { name, username, email, password, phoneNumber } = req.body;

      let profilePicture = "";
      typeof req.file == "undefined"
        ? (profilePicture = "https://via.placeholder.com/150")
        : (profilePicture = req.file.path);

      let resultUsername = await user.findOne({
        where: { username },
      });

      let resultEmail = await user.findOne({
        where: { email },
      });

      let resultPhone = await user.findOne({
        where: { phoneNumber },
      });

      if (resultUsername) {
        res
          .status(406)
          .json({ status: false, message: "Username Sudah Digunakan " });
      } else if (resultEmail) {
        res
          .status(406)
          .json({ status: false, message: "E-mail Sudah Digunakan" });
      } else if (resultPhone) {
        res
          .status(406)
          .json({ status: false, message: "Phone Number Sudah Digunakan" });
      } else {
        let isnum = /^\d+$/.test(phoneNumber);

        if (isnum) {
          let result = await user.create({
            name,
            username,
            email,
            password,
            phoneNumber,
            profilePicture,
          });
          res.status(201).json({
            status: true,
            message: "Berhasil membuat akun",
            data: result,
          });
        } else {
          res
            .status(406)
            .json({ status: false, message: "Phone Number Tidak Valid" });
        }
      }
    } catch (error) {
      res.status(500).json({
        status: true,
        message: "Gagal membuat akun",
        error: error,
      });
    }
  }

  static async login(req, res) {
    try {
      const { login, password } = req.body;

      let resultUsername = await user.findOne({
        include: [order],
        where: { username: login },
      });

      let resultEmail = await user.findOne({
        where: { email: login },
      });

      let resultPhone = await user.findOne({
        where: { phoneNumber: login },
      });

      if (resultUsername) {
        if (decrypt(password, resultUsername.password)) {
          const { id } = resultUsername.dataValues;
          let access_token = generateTokenUser(resultUsername);
          res.status(200).json({
            status: true,
            message: "Berhasil login",
            access_token: access_token,
            id: id,
          });
        } else {
          res.status(403).json({
            status: false,
            message: "Password salah",
          });
        }
      } else if (resultEmail) {
        if (decrypt(password, resultEmail.password)) {
          const { id } = resultEmail.dataValues;
          let access_token = generateTokenUser(resultEmail);
          res.status(200).json({
            status: true,
            message: "Berhasil login",
            access_token: access_token,
            id: id,
          });
        } else {
          res.status(403).json({
            status: false,
            message: "Password salah",
          });
        }
      } else if (resultPhone) {
        if (decrypt(password, resultPhone.password)) {
          const { id } = resultPhone.dataValues;
          let access_token = generateTokenUser(resultPhone);
          res.status(200).json({
            status: true,
            message: "Berhasil login",
            access_token: access_token,
            id: id,
          });
        } else {
          res.status(403).json({
            status: false,
            message: "Password salah",
          });
        }
      } else {
        res.status(404).json({
          status: false,
          message: "Tidak menemukan akun",
          error: error,
        });
      }
    } catch (error) {
      res.status(500).json({
        status: false,
        message: "Gagal login",
        error: error,
      });
    }
  }

  static async detail(req, res) {
    try {
      const id = +req.userData.id;

      let result = await user.findByPk(id, { include: [order] });
      res.status(200).json({
        status: true,
        message: "Berhasil mendapatkan data",
        data: result,
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: "Gagal mendapatkan data",
        error: error,
      });
    }
  }

  static async update(req, res) {
    try {
      const id = +req.userData.id;
      const { name, username, email, phoneNumber } = req.body;
      const resultUser = await user.findByPk(id);

      let profilePicture = "";
      if (resultUser.profilePicture == "https://via.placeholder.com/150") {
        if (typeof req.file == "undefined") {
          profilePicture = "https://via.placeholder.com/150";
        } else {
          profilePicture = req.file.path;
        }
      } else {
        if (typeof req.file == "undefined") {
          profilePicture = resultUser.image;
        } else {
          profilePicture = req.file.path;
        }
      }

      let result = await user.update(
        {
          name,
          username,
          email,
          phoneNumber,
          profilePicture,
        },
        {
          where: { id },
        }
      );
      result == 1
        ? res.status(200).json({
            status: true,
            message: `user dengan id ${id} berhasil diupdate`,
          })
        : res.status(404).json({
            status: true,
            message: `user dengan id ${id} gagal diupdate`,
          });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: "Gagal mengupdate data",
        error: error,
      });
    }
  }

  static async delete(req, res) {
    try {
      const id = +req.userData.id;

      await order.destroy({ where: { userId: id } });
      let result = await user.destroy({ where: { id } });
      result == 1
        ? res.status(200).json({
            status: true,
            message: `User dengan id ${id} berhasil dihapus`,
          })
        : res.status(404).json({
            status: true,
            message: `User dengan id ${id} gagal dihapus`,
          });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: "Gagal menghapus data",
        error: error,
      });
    }
  }

  static async changePassword(req, res) {
    try {
      const id = +req.userData.id;
      const { newPassword, confirmPassword, password } = req.body;
      const findUser = await user.findByPk(id);

      if (newPassword == confirmPassword) {
        if (decrypt(password, findUser.password)) {
          await user.update(
            {
              password: encrypt(newPassword),
            },
            { where: { id } }
          );
          res
            .status(200)
            .json({ status: true, message: "Password Sudah Diubah" });
        } else {
          res.status(403).json({ status: true, message: "Password Salah" });
        }
      } else {
        res
          .status(404)
          .json({ status: true, message: `Password Baru Tidak Sesuai` });
      }
    } catch (error) {
      res.status(500).json({
        status: false,
        message: "Gagal mengubah password",
        error: error,
      });
    }
  }
}

module.exports = UserControlelr;
