const orderRoute = require("express").Router();
const { orderController } = require("../controllers");
const checkToken = require("../services/check_token");

orderRoute.get("/", orderController.getOrder);
orderRoute.get("/detail/", checkToken, orderController.detail);

orderRoute.post("/", checkToken, orderController.addOrder);

orderRoute.put("/:paymentId", checkToken, orderController.cekStatus);
// orderRoute.put("/", orderController.status);

orderRoute.delete("/:id", checkToken, orderController.delete);

module.exports = orderRoute;
