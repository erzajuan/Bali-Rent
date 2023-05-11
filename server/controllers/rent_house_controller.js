const { rentHouse, employee } = require("../models");

class RentHouseController {
  static async getRentHouse(req, res) {
    try {
      let result = await rentHouse.findAll({ include: [employee] });
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async createRentHouse(req, res) {
    try {
      const { address } = req.body;
      let employeeId = req.userData.id;

      let result = await rentHouse.create({
        address,
        employeeId,
      });
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async updateRentHouse(req, res) {
    try {
      const id = +req.params.id;
      const { address } = req.body;
      let result = await rentHouse.update(
        {
          address,
        },
        {
          where: { id },
        }
      );
      result == 1
        ? res
            .status(200)
            .json({ message: `Rent House dengan id ${id} berhasil diupdate` })
        : res
            .status(404)
            .json({ message: `Rent House dengan id ${id} gagal diupdate` });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

module.exports = RentHouseController;
