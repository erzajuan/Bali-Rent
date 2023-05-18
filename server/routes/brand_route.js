const brandRoute = require("express").Router();
const { brandController } = require("../controllers");
const { uploadBrand } = require("../services/multer");


brandRoute.get("/", brandController.getBrand);
brandRoute.post("/", uploadBrand, brandController.addBrand);
brandRoute.put("/:id", uploadBrand, brandController.updateBrand);

module.exports = brandRoute;
