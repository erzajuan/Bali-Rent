const userRoute = require("express").Router();
const { userController } = require("../controllers");
const { uploadUser } = require("../services/multer");

userRoute.get("/", userController.getUsers);
userRoute.post("/", uploadUser, userController.register);
userRoute.post("/login", userController.login);
userRoute.get("/detail/:id", userController.detail);
userRoute.put("/:id", uploadUser, userController.update);

// userRoute.delete("/:id", userController.delete);

module.exports = userRoute;
