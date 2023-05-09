const orderRoute = require("express").Router();
const { orderController } = require("../controllers");
const checkToken = require("../services/check_token");

orderRoute.get("/", orderController.getOrder);
orderRoute.post("/", checkToken, orderController.addOrder);
orderRoute.get("/detail/:id", orderController.detail);
// orderRoute.put("/:id", orderController.update);

module.exports = orderRoute;
