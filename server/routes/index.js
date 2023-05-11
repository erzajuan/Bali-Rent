const route = require("express").Router();

route.get("/api", (req, res) => {
  res.status(200).json({
    message: "Welcome to Bali Rent API",
  });
});

const userRoute = require("./user_route");
const employeeRoute = require("./employee_route");
const orderRoute = require("./order_route");
const rentHouseRoute = require("./rent_house_route");

route.use("/api/users", userRoute);
route.use("/api/employes", employeeRoute);
route.use("/api/orders", orderRoute);
route.use("/api/rent",rentHouseRoute);

module.exports = route;
