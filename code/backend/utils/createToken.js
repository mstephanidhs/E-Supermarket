const jwt = require("jsonwebtoken");

// create the JWT token (paylod: id, secret: process.env.JWT_SECRET)
exports.createToken = (id, expirationDate) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: expirationDate,
  });
};
