const carRoute = require("express").Router();
const { carController } = require("../controllers");
const checkToken = require("../services/check_token");
const { uploadCar } = require("../services/multer");

carRoute.get("/", carController.getCar);
carRoute.post("/", uploadCar, checkToken, carController.addCar);
carRoute.put("/:id", uploadCar, carController.updateCar);

module.exports = carRoute;
