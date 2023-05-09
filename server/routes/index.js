const route = require("express").Router();

route.get("/api", (req, res) => {
  res.status(200).json({
    message: "Welcome to Bali Rent API",
  });
});

const userRoute = require("./user_route");
const employeeRoute = require("./employee_route");

route.use("/api/users", userRoute);
route.use("/api/employes", employeeRoute);

module.exports = route;
