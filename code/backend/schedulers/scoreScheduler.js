const schedule = require('node-schedule');
const { db } = require('./../lib/dbConfig');

exports.scoreScheduler = () => {
  schedule.scheduleJob('59 23 28 * *', async () => {
    try {
      const modifyScoreQuery =
        'UPDATE score SET past_score = past_score + current_score, current_score = 0';

      await db.promise().query(modifyScoreQuery);
    } catch (error) {
      console.error('Error perfoming monthly task: ', error);
    }
  });
};
