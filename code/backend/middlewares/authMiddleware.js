const jwt = require("jsonwebtoken");
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DATABASE_PORT,
});

// apply this middleware to every route that requires authentication
// putting as a parameter the next keyword, the server knows that this function is a middleware
exports.verifyToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];

    try {
      const decodedPayload = jwt.verify(bearerToken, process.env.JWT_SECRET);

      const findUserQuery = "SELECT * FROM user WHERE user_id = ?";
      db.query(findUserQuery, [decodedPayload.id], async (error, result) => {
        if (error) {
          console.log(error.message);
          return;
        }

        if (result.length === 0)
          res.status(401).json({
            message: "You need to provide valid authentication credentials",
          });

        req.token = bearerToken;
        next();
      });
    } catch (error) {
      console.log("Error decoding JWT: ", error.message);
    }
  } else {
    return res.status(401).json({
      message: "You need to provide valid authentication credentials",
    });
  }
};
