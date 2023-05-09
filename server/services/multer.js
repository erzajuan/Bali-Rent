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

// const uploadMulterEmployee = multer({
//   storage: diskStorage,
// }).single("profilePicture");
// let uploadEmployee = (req, res, next) => {
//   uploadMulterEmployee(req, res, function (err) {
//     if (err) {
//       return next(err);
//     }
//     if (typeof req.file == "undefined") {
//       next();
//     } else {
//       image =
//         req.protocol + "://" + req.get("host") + "/assets/" + req.file.filename;
//       req.file.path = image;
//       next();
//     }
//   });
// };

module.exports = uploadUser;
