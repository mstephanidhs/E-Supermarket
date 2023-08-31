const schedule = require('node-schedule');
const { db } = require('./../lib/dbConfig');

exports.initializeTokens = () => {
  schedule.scheduleJob('0 0 1 * *', async () => {
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

exports.distributeTokens = () => {
  schedule.scheduleJob('50 23 28 * *', async () => {
    try {
      const getTotalTokensQuery = 'SELECT total_tokens FROM totaltokens';
      const getUsersScores = 'SELECT current_score, user_id FROM score';
      const getTotalScoreOfUsersQuery =
        'SELECT sum(current_score) AS totalScore FROM score;';
      const updateUserTokensQuery =
        'UPDATE tokens SET total_tokens = total_tokens + ?, previous_month_tokens = current_tokens, current_tokens = ? WHERE user_id = ?';

      const [result] = await db.promise().query(getTotalTokensQuery);
      const totalTokens = result[0].total_tokens * 0.8;

      const [result1] = await db.promise().query(getTotalScoreOfUsersQuery);
      const totalScore = result1[0].totalScore;

      const [rows] = await db.promise().query(getUsersScores);

      for (const row of rows) {
        const userTokens = Math.round(
          (totalTokens * row.current_score) / totalScore
        );
        await db
          .promise()
          .query(updateUserTokensQuery, [userTokens, userTokens, row.user_id]);
      }
    } catch (error) {
      console.error('Error perfoming monthly task: ', error);
    }
  });
};
