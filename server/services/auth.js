const jwt = require("jsonwebtoken");
const token = process.env.TOKEN || "token";

const generateTokenUser = (data) => {
  const { id, username, email, phoneNumber, profilePicture, orders } = data;

  return jwt.sign({ id, username, email, phoneNumber, profilePicture, orders }, token);
};

const generateTokenEmployee = (data) => {
  const { id, username, email, phoneNumber, role, rentHouse } = data;

  return jwt.sign({ id, username, email, phoneNumber, role , rentHouse }, token);
};

const verifToken = (data) => {
  return jwt.verify(data, token);
};

module.exports = { generateTokenUser, generateTokenEmployee, verifToken };
