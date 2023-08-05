const mysql = require("mysql2");
const bcrypt = require("bcryptjs");

const { passwordStrength } = require("./../utils/checkPassword");
const { createToken } = require("./../utils/createToken");
const { readBitField } = require("../utils/readBitField");

const expirationDate = 3 * 24 * 60 * 60;

//start the connection
const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DATABASE_PORT,
});

// Login Controller
exports.login = async (req, res) => {
  // destructing the fields of the req received
  const { email, password } = req.body;

  // check if both fields have been filled
  if (!email || !password)
    return res.status(400).json({ message: "All form fields are required!" });

  // check if the email given is correct
  const query =
    "SELECT isadmin, password, user_id, username FROM user WHERE email = ?";
  db.query(query, [email.trim()], async (error, result) => {
    if (error) {
      console.log(error.message);
      return;
    }

    if (result.length === 0)
      return res.status(401).json({ message: "Incorrect email!" });

    const isMatch = await bcrypt.compare(password, result[0].password);
    if (!isMatch)
      return res.status(401).json({ message: "Incorrect password!" });

    const role = readBitField(result[0].isadmin);

    // if none of the above conditions are true, then the user can login
    // create a jwt token for the already registered user
    const token = createToken(result[0].user_id, expirationDate);

    res.status(200).json({
      message: "Login successful!",
      token,
      role: role === true ? "admin" : "user",
      name: result[0].username,
      userId: result[0].user_id,
    });
  });
};

// Register Controller
exports.register = async (req, res) => {
  // destructuring the fields of the req received
  const { username, email, password, rePassword } = req.body;

  // check if every field has been filled
  if (!username || !email || !password || !rePassword)
    return res.status(400).json({ message: "All form fields are required!" });
  else if (password !== rePassword)
    return res.status(401).json({ message: "The passwords do not match!" });
  else {
    const strength = passwordStrength(password);
    if (strength < 4)
      return res
        .status(401)
        .json({ message: "Password is not strong enough!" });
  }

  // check if email is used
  const emailQuery = "SELECT email FROM user WHERE email = ?";
  db.query(emailQuery, [email.trim()], async (error, result) => {
    if (error) {
      console.log(error.message);
      return;
    }

    if (result.length > 0)
      return res.status(409).json({ message: "Email is already in use!" });

    const usernameQuery = "SELECT username FROM user WHERE username = ?";
    db.query(usernameQuery, [username.trim()], async (error, result) => {
      if (error) {
        console.log(error.message);
        return;
      }

      if (result.length > 0)
        return res.status(409).json({ message: "Username is already in use!" });
    });

    // if none of the above conditions are true, register the user
    const hashedPassword = await bcrypt.hash(password, 8);

    const newUserQuery =
      "INSERT INTO user (username, email, password, isadmin) VALUES (?, ?, ?, ?)";
    db.query(
      newUserQuery,
      [username, email, hashedPassword, 0],
      async (error, result) => {
        if (error) {
          console.log(error.message);
          return;
        }

        const findNewUserQuery =
          "SELECT user_id, username FROM user WHERE email = ?";
        db.query(findNewUserQuery, [email], async (error, result) => {
          if (error) {
            console.log(error.message);
            return;
          }

          const token = createToken(result[0].user_id, expirationDate);
          res.status(200).json({
            message: "Register successful!",
            token,
            role: "user",
            name: result[0].username,
          });
        });
      }
    );
  });
};

exports.forgotPassword = async (req, res) => {
  const { email, newPass, rePass } = req.body;

  if (!email || !newPass || !rePass)
    return res.status(400).json({ error: "All form fields are required!" });
  else if (newPass !== rePass)
    return res.status(401).json({ error: "The passwords do not match!" });
  else {
    const strength = passwordStrength(newPass);
    if (strength < 4)
      return res
        .status(401)
        .json({ message: "Password is not strong enough!" });
  }

  // check if the email provided is correct
  const emailQuery = "SELECT user_id FROM user WHERE email = ?";
  db.query(emailQuery, [email.trim()], async (error, result) => {
    if (error) {
      console.log(error.message);
      return;
    }

    if (result.length === 0)
      return res.status(401).json({ message: "Incorrect email!" });

    const hashedPassword = await bcrypt.hash(newPass, 8);
    const changePasswordQuery =
      "UPDATE user SET password = ? WHERE user_id = ?";

    db.query(
      changePasswordQuery,
      [hashedPassword, result[0].user_id],
      async (error, result) => {
        if (error) {
          console.log(error.message);
          return;
        }

        return res
          .status(200)
          .json({ message: "Password changed successfully!" });
      }
    );
  });
};
