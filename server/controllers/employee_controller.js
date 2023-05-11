const { employee, rentHouse } = require("../models");
const { generateTokenEmployee, verifToken } = require("../services/auth");
const { decrypt } = require("../services/bcrypt");

class EmployeeController {
  static async getEmployee(req, res) {
    try {
      let result = await employee.findAll({ include: [rentHouse] });
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async register(req, res) {
    try {
      const { name, username, email, password, phoneNumber, role } = req.body;

      let result = await employee.create({
        name,
        username,
        email,
        password,
        phoneNumber,
        role,
      });
      console.log(name, username, email, password, phoneNumber, role);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async login(req, res) {
    try {
      const { login, password } = req.body;

      let resultUsername = await employee.findOne({
        include: [rentHouse],
        where: { username: login },
      });

      let resultEmail = await employee.findOne({
        where: { email: login },
      });

      let resultPhone = await employee.findOne({
        where: { phoneNumber: login },
      });

      if (resultUsername) {
        if (decrypt(password, resultUsername.password)) {
          let access_token = generateTokenEmployee(resultUsername);
          res.status(200).json({ access_token });
        } else {
          res.status(403).json({ message: "Password Salah" });
        }
      } else if (resultEmail) {
        if (decrypt(password, resultEmail.password)) {
          let access_token = generateTokenEmployee(resultEmail);
          res.status(200).json({ access_token });
        } else {
          res.status(403).json({ message: "Password Salah" });
        }
      } else if (resultPhone) {
        if (decrypt(password, resultPhone.password)) {
          let access_token = generateTokenEmployee(resultPhone);
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
      let result = await employee.findByPk(id, { include: [rentHouse] });
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async update(req, res) {
    try {
      const id = +req.params.id;
      const { name, username, email, phoneNumber } = req.body;

      let result = await employee.update(
        {
          name,
          username,
          email,
          phoneNumber,
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

module.exports = EmployeeController;
