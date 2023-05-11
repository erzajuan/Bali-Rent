const { car, brand, rentHouse } = require("../models");

class CarController {
  static async getCar(req, res) {
    try {
      let result = await car.findAll({ include: [brand, rentHouse] });
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
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

      let rentHouseId = req.userData.rentHouse.id;
      console.log(rentHouseId);
      let carImage = req.file.path;

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
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async updateCar(req, res) {
    try {
      const id = +req.params.id;
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
      carImage = req.file.path;
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

module.exports = CarController;
