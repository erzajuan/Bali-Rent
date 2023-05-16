const { order, user, car, rentHouse } = require("../models");

class OrderController {
  static async getOrder(req, res) {
    try {
      let result = await order.findAll({ include: [user, car, rentHouse] });
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async addOrder(req, res) {
    try {
      let userId = req.userData.id;
      const { orderDate, startDate, finishDate, carId } = req.body;
      let findCar = await car.findByPk(carId);

      let result = await order.create({
        orderDate,
        startDate,
        finishDate,
        carId,
        userId,
        rentHouseId: findCar.rentHouseId,
      });
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async detail(req, res) {
    try {
      const id = +req.params.id;
      let result = await order.findByPk(id, {
        include: [user, car, rentHouse],
      });
      res.status(200).json(result);
    } catch (error) {
      res.status(404).json(error);
    }
  }

  static async delete(req, res) {
    try {
      const id = +req.params.id;
      let result = await order.destroy({ where: { id } });
      result == 1
        ? res
            .status(200)
            .json({ message: `Order dengan id ${id} berhasil dihapus` })
        : res
            .status(404)
            .json({ message: `Order dengan id ${id} gagal dihapus` });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

module.exports = OrderController;
