const schedule = require("node-schedule");
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DATABASE_PORT,
});

exports.scoreScheduler = () => {
  schedule.scheduleJob("59 23 28 * *", async () => {
    try {
      const modifyScoreQuery =
        "UPDATE score SET past_score = past_score + current_score, current_score = 0";

      await db.promise().query(modifyScoreQuery);
    } catch (error) {
      console.error("Error perfoming monthly task: ", error);
    }
  });
};
