const { rentHouse, employee, car } = require("../models");

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

      let findRentHouse = await rentHouse.findOne({
        where: { employeeId: employeeId },
      });
      console.log(findRentHouse);
      if (findRentHouse) {
        res.status(404).json({ message: "Anda Sudah Memiliki Rental" });
      } else {
        let result = await rentHouse.create({
          address,
          employeeId,
        });
        res.status(201).json(result);
      }
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

  static async delete(req, res) {
    try {
      const id = +req.params.id;

      let resultCar = await car.destroy({ where: { rentHouseId: id } });

      let result = await rentHouse.destroy({
        where: { id },
      });
      result == 1
        ? res
            .status(200)
            .json({ message: `Rent House dengan id ${id} berhasil dihapus` })
        : res
            .status(404)
            .json({ message: `Rent House dengan id ${id} gagal dihapus` });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

module.exports = RentHouseController;
