const employeeRoute = require("express").Router();
const { employeeController } = require("../controllers");
const checkToken = require("../services/check_token");

employeeRoute.get("/", employeeController.getEmployee);
employeeRoute.get("/detail/", checkToken, employeeController.detail);

employeeRoute.post("/", employeeController.register);
employeeRoute.post("/login", employeeController.login);

employeeRoute.put("/", checkToken, employeeController.update);
employeeRoute.put("/changePassword/", checkToken, employeeController.changePassword)

employeeRoute.delete("/", checkToken, employeeController.delete);




module.exports = employeeRoute;
