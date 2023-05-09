const employeeRoute = require("express").Router();
const { employeeController } = require("../controllers");

employeeRoute.get("/", employeeController.getEmployee);
employeeRoute.post("/", employeeController.register);
employeeRoute.post("/login", employeeController.login);
employeeRoute.get("/detail/:id", employeeController.detail);
employeeRoute.put("/:id", employeeController.update);



module.exports = employeeRoute;
