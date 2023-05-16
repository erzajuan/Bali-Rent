const rentHouseRoute = require("express").Router();
const { rentHouseController } = require("../controllers");
const checkToken = require("../services/check_token");

rentHouseRoute.get("/", rentHouseController.getRentHouse);
rentHouseRoute.post("/", checkToken, rentHouseController.createRentHouse);
rentHouseRoute.put("/:id", rentHouseController.updateRentHouse);
rentHouseRoute.delete("/:id", rentHouseController.delete);

module.exports = rentHouseRoute;
