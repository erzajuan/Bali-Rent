const carRoute = require("express").Router();
const { carController } = require("../controllers");
const checkToken = require("../services/check_token");
const { uploadCar } = require("../services/multer");

carRoute.get("/", carController.getCar);
carRoute.post("/", uploadCar, checkToken, carController.addCar);
carRoute.put("/:id", checkToken, uploadCar, carController.updateCar);
carRoute.delete("/:id", carController.delete)

module.exports = carRoute;
