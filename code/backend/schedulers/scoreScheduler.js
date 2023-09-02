const schedule = require('node-schedule');
const { db } = require('./../lib/dbConfig');

// this scheduler will activate every 28 days (February is considered) at 23:59
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
