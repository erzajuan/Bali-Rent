const { user, order } = require("../models");
const { generateTokenUser, verifToken } = require("../services/auth");
const { decrypt } = require("../services/bcrypt");

class UserControlelr {
  static async getUsers(req, res) {
    try {
      let result = await user.findAll({ include: [order] });
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async register(req, res) {
    try {
      const { name, username, email, password, phoneNumber } = req.body;
      const profilePicture = req.file.path;

      let result = await user.create({
        name,
        username,
        email,
        password,
        phoneNumber,
        profilePicture,
      });
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json(error);
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
          let access_token = generateTokenUser(resultUsername);
          let value = verifToken(access_token);

          res.status(200).json({ access_token });
        } else {
          res.status(403).json({ message: "Password Salah" });
        }
      } else if (resultEmail) {
        if (decrypt(password, resultEmail.password)) {
          let access_token = generateTokenUser(resultEmail);
          res.status(200).json({ access_token });
        } else {
          res.status(403).json({ message: "Password Salah" });
        }
      } else if (resultPhone) {
        if (decrypt(password, resultPhone.password)) {
          let access_token = generateTokenUser(resultPhone);
          res.status(200).json({ access_token });
        } else {
          res.status(403).json({ message: "Password Salah" });
        }
      } else {
        res
          .status(404)
          .json({ message: "Username/Email/Phone Number Not Found" });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async detail(req, res) {
    try {
      const id = +req.params.id;
      let result = await user.findByPk(id, { include: [order] });
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async update(req, res) {
    try {
      const id = +req.params.id;
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
        ? res
            .status(200)
            .json({ message: `user dengan id ${id} berhasil diupdate` })
        : res
            .status(404)
            .json({ message: `user dengan id ${id} gagal diupdate` });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

module.exports = UserControlelr;
