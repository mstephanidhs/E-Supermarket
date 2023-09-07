const schedule = require('node-schedule');
const { db } = require('./../lib/dbConfig');

// this scheduler will activate at midnight on the 1st day of every month.
exports.initializeTokens = () => {
  schedule.scheduleJob('0 0 1 * *', async () => {
    // the total tokens calculated for each month are stored inside a table in the db
    try {
      const totalUsersQuery = 'SELECT count(user_id) AS totalUsers FROM user;';
      const createTotalTokensQuery = 'UPDATE totaltokens SET total_tokens = ?';

      const [totalUsers] = await db.promise().query(totalUsersQuery);

      await db
        .promise()
        .query(createTotalTokensQuery, [totalUsers[0].totalUsers * 100]);
    } catch (error) {
      console.error('Error perfoming monthly task: ', error);
    }
  });
};

// this scheduler will be activated at 11:50 PM on the 28th day of every month
exports.distributeTokens = () => {
  schedule.scheduleJob('50 23 28 * *', async () => {
    try {
      // need all these selects in order to calculate the weighted average
      // get the total tokens for the month
      const getTotalTokensQuery = 'SELECT total_tokens FROM totaltokens';
      // get the score of each user
      const getUsersScores = 'SELECT current_score, user_id FROM score';
      // the total score summing the score of every user
      const getTotalScoreOfUsersQuery =
        'SELECT sum(current_score) AS totalScore FROM score;';
      const updateUserTokensQuery =
        'UPDATE tokens SET total_tokens = total_tokens + ?, previous_month_tokens = current_tokens, current_tokens = ? WHERE user_id = ?';

      const [result] = await db.promise().query(getTotalTokensQuery);
      const totalTokens = result[0].total_tokens * 0.8;

      const [result1] = await db.promise().query(getTotalScoreOfUsersQuery);
      const totalScore = result1[0].totalScore;

      const [rows] = await db.promise().query(getUsersScores);

      // iterate through the score of every user
      for (const row of rows) {
        // calculate the weighted average
        const userTokens = Math.round(
          (totalTokens * row.current_score) / totalScore
        );
        // store the result to the corresponding table inside the db
        await db
          .promise()
          .query(updateUserTokensQuery, [userTokens, userTokens, row.user_id]);
      }
    } catch (error) {
      console.error('Error perfoming monthly task: ', error);
    }
  });
};
