const jwt = require("jsonwebtoken");
const token = process.env.TOKEN || "token";

const generateTokenUser = (data) => {
  const { id, name, username, email, phoneNumber, profilePicture } = data;

  return jwt.sign({ id, name, username, email, phoneNumber, profilePicture }, token);
};

const generateTokenEmployee = (data) => {
  const { id, name, username, email, phoneNumber, role, rentHouse } = data;

  return jwt.sign({ id, name, username, email, phoneNumber, role , rentHouse }, token);
};

const verifToken = (data) => {
  return jwt.verify(data, token);
};

module.exports = { generateTokenUser, generateTokenEmployee, verifToken };
