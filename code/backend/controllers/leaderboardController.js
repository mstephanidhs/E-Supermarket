const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DATABASE_PORT,
});

exports.fetchUsersLeaderboard = (req, res) => {
  const usersQuery =
    "SELECT u.username, t.previous_month_tokens, t.total_tokens, s.past_score, u.user_id AS id FROM user u INNER JOIN tokens t ON t.user_id = u.user_id INNER JOIN score s ON s.user_id = u.user_id";

  db.query(usersQuery, async (error, result) => {
    if (error) {
      console.log(error.message);
      return;
    }

    return res.status(200).json({
      message: "Users for the Leaderboard are fetched!",
      result,
    });
  });
};
