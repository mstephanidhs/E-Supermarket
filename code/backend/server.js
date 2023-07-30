const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const mysql = require("mysql");

// location of the .env file
dotenv.config({ path: "./.env" });

const app = express();

// create connection with the MySQL Databas
// !!! CHANGET THE ENV FILE !!!
const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});

// connect to the database
db.connect((error) => {
  if (error) console.log(error);
  // if anything goes wrong with the connection, the appropriate error will appear
  else console.log("DB connection was successful!");
});
//so now our application in node.js is actually connected to the database we just created in phpmyadmin

//======= MIDDLEWARES =======

// Parse JSON bodies (as sent by API clients)
// Basically, make sure that the data coming from the front-end are in json form
app.use(express.json());

// set the cookie parser middleware
app.use(cookieParser());

// Define Routes
// app.use("/", require("./routes/pages"));
// app.use("/auth", require("./routes/auth"));

//======= MIDDLEWARES =======

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
