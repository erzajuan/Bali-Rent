const { car, brand, rentHouse, order } = require("../models");

class CarController {
  static async getCar(req, res) {
    try {
      let result = await car.findAll({ include: [brand, rentHouse] });
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

  static async addCar(req, res) {
    try {
      const {
        name,
        rentPrice,
        plateNumber,
        fuelType,
        seatCount,
        carYear,
        brandId,
        transmission,
        wdType,
      } = req.body;

      if (req.userData.rentHouse == null) {
        res.status(404).json({
          status: false,
          message: "Anda Belum Mempunyai Tempat Rental",
        });
      } else {
        const rentHouseId = req.userData.rentHouse.id;

        let carImage = "";
        typeof req.file == "undefined"
          ? (carImage = "https://via.placeholder.com/150")
          : (carImage = req.file.path);

        let result = await car.create({
          name,
          rentPrice,
          plateNumber,
          fuelType,
          seatCount,
          carYear,
          brandId,
          transmission,
          wdType,
          carImage,
          rentHouseId,
        });
        res.status(201).json({
          status: true,
          message: "Berhasil menambahkan mobil",
          data: result,
        });
      }
    } catch (error) {
      res.status(500).json({
        status: false,
        message: "Gagal menambahkan mobil",
        error: error,
      });
    }
  }

  static async updateCar(req, res) {
    try {
      const id = +req.params.id;
      const resultCar = await car.findByPk(id);
      const {
        name,
        rentPrice,
        plateNumber,
        fuelType,
        seatCount,
        carYear,
        brandId,
        transmission,
        wdType,
      } = req.body;
      let carImage = "";
      if (resultCar.profilePicture == "https://via.placeholder.com/150") {
        if (typeof req.file == "undefined") {
          carImage = "https://via.placeholder.com/150";
        } else {
          carImage = req.file.path;
        }
      } else {
        if (typeof req.file == "undefined") {
          carImage = resultCar.image;
        } else {
          carImage = req.file.path;
        }
      }
      
      let result = await car.update(
        {
          name,
          rentPrice,
          plateNumber,
          fuelType,
          seatCount,
          carYear,
          brandId,
          transmission,
          wdType,
          carImage,
        },
        {
          where: { id },
        }
      );
      result == 1
        ? res.status(200).json({
            status: true,
            message: `Car dengan id ${id} berhasil diupdate`,
          })
        : res.status(404).json({
            status: false,
            message: `Car dengan id ${id} gagal diupdate`,
          });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: "Gagal menghaous mobil",
        error: error,
      });
    }
  }

  static async delete(req, res) {
    try {
      const id = +req.params.id;

      await order.destroy({ where: { carId: id } });
      let result = await car.destroy({ where: { id } });
      result == 1
        ? res.status(200).json({
            status: true,
            message: `Car dengan id ${id} berhasil dihapus`,
          })
        : res.status(404).json({
            status: false,
            message: `Car dengan id ${id} gagal dihapus`,
          });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: "Gagal menghapus mobil",
        error: error,
      });
    }
  }
}

module.exports = CarController;
