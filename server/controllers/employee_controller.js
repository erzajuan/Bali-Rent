const { employee, rentHouse } = require("../models");
const { generateTokenEmployee, verifToken } = require("../services/auth");
const { decrypt, encrypt } = require("../services/bcrypt");

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
      const { name, username, email, password, phoneNumber } = req.body;

      let resultUsername = await employee.findOne({
        where: { username },
      });

      let resultEmail = await employee.findOne({
        where: { email },
      });

      let resultPhone = await employee.findOne({
        where: { phoneNumber },
      });

      if (resultUsername) {
        res.status(406).json({ message: "Username Sudah Digunakan " });
      } else if (resultEmail) {
        res.status(406).json({ message: "E-mail Sudah Digunakan" });
      } else if (resultPhone) {
        res.status(406).json({ message: "Phone Number Sudah Digunakan" });
      } else {
        let isnum = /^\d+$/.test(phoneNumber);

        if (isnum) {
          let result = await employee.create({
            name,
            username,
            email,
            password,
            phoneNumber,
          });
          res.status(201).json(result);
        } else {
          res.status(406).json({ message: "Phone Number Tidak Valid" });
        }
      }
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
        include: [rentHouse],
        where: { email: login },
      });

      let resultPhone = await employee.findOne({
        include: [rentHouse],
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

  static async delete(req, res) {
    try {
      const id = +req.params.id;

      let resultRentHouse = await rentHouse.destroy({
        where: { employeeId: id },
      });

      let result = await employee.destroy({ where: { id } });
      result == 1
        ? res
            .status(200)
            .json({ message: `Employee dengan id ${id} berhasil dihapus` })
        : res
            .status(404)
            .json({ message: `Employee dengan id ${id} gagal dihapus` });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async changePassword(req, res) {
    try {
      const id = +req.params.id;
      const { newPassword, confirmPassword, password } = req.body;
      let findEmployee = await employee.findByPk(id);

      if (newPassword == confirmPassword) {
        if (decrypt(password, findEmployee.password)) {
          let result = await employee.update(
            {
              password: encrypt(newPassword),
            },
            { where: { id } }
          );
          res.status(200).json({ message: "Password Sudah Diubah" });
        } else {
          res.status(403).json({ message: "Password Salah" });
        }
      } else {
        res.status(404).json({ message: `Password Baru Tidak Sesuai` });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

module.exports = EmployeeController;
