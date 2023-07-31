const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const { passwordStrength } = require("../utils/checkPassword");

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DATABASE_PORT,
});

exports.changeUsername = (req, res) => {
  const { newName } = req.body;

  if (!newName) return res.status(400).json({ error: "Field is empty!" });

  const nameQuery = "SELECT user_id FROM user WHERE username = ?";

  db.query(nameQuery, [newName.trim()], async (error, result) => {
    if (error) {
      console.log(error.message);
      return;
    } else if (result.length > 0)
      return res
        .status(409)
        .json({ error: "This Username is already in use!" });
  });

  // the username given is unique
  const newNameQuery = "UPDATE user SET username = ? WHERE user_id = ?";
  const token = req.cookies.jwt;

  jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
    if (err) {
      console.log(err.message);
      return;
    } else {
      db.query(
        newNameQuery,
        [newName.trim(), decodedToken.id],
        async (error, result) => {
          if (error) {
            console.log(error.message);
            return;
          }
        }
      );
    }
  });

  res.status(200).json({ message: "Username changed successfully!" });
};

exports.changePassword = (req, res) => {
  const { oldPass, newPass, rePass } = req.body;

  if (!oldPass || !newPass || !rePass)
    return res.status(400).json({ error: "All form fields are required!" });

  const token = req.cookies.jwt;
  const findUserQuery = "SELECT password FROM user WHERE user_id = ?";

  jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
    if (err) {
      console.log(err.message);
      return;
    }

    db.query(findUserQuery, [decodedToken.id], async (err, result) => {
      if (err) {
        console.log(err.message);
        return;
      }

      // check if the password given is correct
      const isMatch = await bcrypt.compare(oldPass, result[0].password);
      if (!isMatch)
        return res.status(401).json({ error: "Incorrect current password!" });

      if (newPass !== rePass)
        return res.status(401).json({ error: "The passwords do not match!" });

      // check if the password meets the criteria
      if (passwordStrength(newPass) < 4)
        return res
          .status(401)
          .json({ error: "Password is not strong enough!" });

      // everything's fine, so hash the password and update the user
      const hashedPassword = await bcrypt.hash(newPass, 8);
      const newPasswordQuery = "UPDATE user SET password = ? WHERE user_id = ?";

      db.query(
        newPasswordQuery,
        [hashedPassword, decodedToken.id],
        (err, result) => {
          if (error) {
            console.log(error.message);
            return;
          }
        }
      );
    });
  });

  res.status(200).json({ message: "Password changed successfully!" });
};
