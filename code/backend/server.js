const express = require('express');
const dotenv = require('dotenv');
const mysql = require('mysql2');
const cors = require('cors');
// location of the .env file
dotenv.config({ path: './.env' });

const app = express();

// create connection with the MySQL Databas
const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DATABASE_PORT,
});

// connect to the database
db.connect((error) => {
  if (error) console.log(error);
  // if anything goes wrong with the connection, the appropriate error will appear
  else console.log('DB connection was successful!');
});
//so now our application in node.js is actually connected to the database we just created in phpmyadmin

// require all the schedulers
const { offerScheduler } = require('./schedulers/offerScheduler');
const { scoreScheduler } = require('./schedulers/scoreScheduler');
const {
  initializeTokens,
  distributeTokens,
} = require('./schedulers/tokensScheduler');

//======= MIDDLEWARES =======

const corsOptions = {
  origin: '*',
  credentials: true, //access-control-allow-credentials:true
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
};

app.use(cors(corsOptions)); // Use this after the variable declaration

// Handle OPTIONS request for /store/fetchAllStores
app.options('/auth/login', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.sendStatus(200);
});

// Parse JSON bodies (as sent by API clients)
// Basically, make sure that the data coming from the front-end are in json form
app.use(express.json());

//======= MIDDLEWARES =======

// routing
app.use('/auth', require('./routes/auth'));
app.use('/profile', require('./routes/profile'));
app.use('/store', require('./routes/store'));
app.use('/categories', require('./routes/categories'));
app.use('/offer', require('./routes/offer'));
app.use('/reaction', require('./routes/reaction'));
app.use('/leaderboard', require('./routes/leaderboard'));
app.use('/uploadFiles', require('./routes/files'));
app.use('/statistics', require('./routes/statistics'));

//======= SCHEDULERS =======
offerScheduler();
initializeTokens();
distributeTokens();
scoreScheduler();

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
