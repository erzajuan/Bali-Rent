const userRoute = require("express").Router();
const { userController } = require("../controllers");
const { uploadUser } = require("../services/multer");
const checkToken = require("../services/check_token");

userRoute.get("/", userController.getUsers);
userRoute.get("/detail/", checkToken, userController.detail);

userRoute.post("/", uploadUser, userController.register);
userRoute.post("/login", userController.login);

userRoute.put("/", checkToken, uploadUser, userController.update);
userRoute.put("/changePassword/", checkToken, userController.changePassword);

userRoute.delete("/", checkToken, userController.delete);

module.exports = userRoute;
