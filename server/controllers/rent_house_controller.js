const { rentHouse, employee, car } = require("../models");

class RentHouseController {
  static async getRentHouse(req, res) {
    try {
      let result = await rentHouse.findAll({ include: [employee] });
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

  static async createRentHouse(req, res) {
    try {
      const { address } = req.body;
      const employeeId = req.userData.id;

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
        res.status(201).json({
          status: true,
          message: "Berhasil membuat rental",
          data: result,
        });
      }
    } catch (error) {
      res.status(500).json({
        status: false,
        message: "Gagal membuat rental",
        error: error,
      });
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
        ? res.status(200).json({
            status: true,
            message: `Rent House dengan id ${id} berhasil diupdate`,
          })
        : res.status(404).json({
            status: false,
            message: `Rent House dengan id ${id} gagal diupdate`,
          });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: "Gagal mengupdate rental",
        error: error,
      });
    }
  }

  static async delete(req, res) {
    try {
      const id = +req.params.id;

      await car.destroy({ where: { rentHouseId: id } });
      let result = await rentHouse.destroy({
        where: { id },
      });
      result == 1
        ? res.status(200).json({
            status: true,
            message: `Rent House dengan id ${id} berhasil dihapus`,
          })
        : res.status(404).json({
            status: false,
            message: `Rent House dengan id ${id} gagal dihapus`,
          });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: "Gagal menghapus data",
        error: error,
      });
    }
  }

  static async detail(req, res) {
    try {
      const id = +req.params.id;

      let result = await rentHouse.findByPk(id, { include: [employee] });
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
}

module.exports = RentHouseController;
