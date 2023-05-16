var multer = require("multer");

const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./assets/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const uploadMulterUser = multer({
  storage: diskStorage,
}).single("profilePicture");
let uploadUser = (req, res, next) => {
  uploadMulterUser(req, res, function (err) {
    if (err) {
      return next(err);
    }
    if (typeof req.file == "undefined") {
      next();
    } else {
      image =
        req.protocol + "://" + req.get("host") + "/assets/" + req.file.filename;
      req.file.path = image;
      next();
    }
  });
};

const uploadMulterCar = multer({
  storage: diskStorage,
}).single("carImage");
let uploadCar = (req, res, next) => {
  uploadMulterCar(req, res, function (err) {
    if (err) {
      return next(err);
    }
    if (typeof req.file == "undefined") {
      next();
    } else {
      image =
        req.protocol + "://" + req.get("host") + "/assets/" + req.file.filename;
      req.file.path = image;
      next();
    }
  });
};

const uploadMulterBrand = multer({
  storage: diskStorage,
}).single("brandImage");
let uploadBrand = (req, res, next) => {
  uploadMulterBrand(req, res, function (err) {
    if (err) {
      return next(err);
    }
    if (typeof req.file == "undefined") {
      next();
    } else {
      image =
        req.protocol + "://" + req.get("host") + "/assets/" + req.file.filename;
      req.file.path = image;
      next();
    }
  });
};

module.exports = { uploadUser, uploadCar, uploadBrand };
