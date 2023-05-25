const { verifToken } = require("./auth");

const checkToken = (req, res, next) => {
  const access_token = req.headers.access_token;

  if (access_token) {
    try {
      let token = verifToken(access_token);
      req.userData = token;
      next();
    } catch (error) {
      res.status(401).json({ message: "Token not Authenticated!" });
    }
  } else {
    res.status(401).json({ message: "Token not Found!" });
  }
};

module.exports = checkToken;
