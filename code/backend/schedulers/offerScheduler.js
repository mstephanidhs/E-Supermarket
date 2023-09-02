const schedule = require('node-schedule');
const { db } = require('./../lib/dbConfig');

// this scheduler will activate every day at exactly 11:59:59 PM
exports.offerScheduler = () => {
  schedule.scheduleJob('59 23 * * *', async () => {
    try {
      // 7 days before the current day
      const now = new Date();
      now.setDate(now.getDate() - 7);
      // flags that check if any of the 2 conditions (based on the score) are valid
      let yesterdayAvgFlag = false;
      let previousWeekAvgFlag = false;

      const getOffersQuery =
        'SELECT product, price, offer_id FROM offer WHERE date_offer <= ?';
      const yesterdayAVGQuery =
        'SELECT price FROM productsinstore WHERE product_id = ? AND DATE(date_product) = DATE(NOW() - INTERVAL 1 DAY);';
      // get the average of the day that is closer to the current date
      const weekAVGQuery =
        'SELECT price AS AveragePrice FROM productsinstore WHERE product_id = ? AND date_product >= DATE(NOW() - INTERVAL 1 WEEK) AND date_product < DATE(NOW()) ORDER BY ABS(DATEDIFF(NOW(), date_product)) ASC LIMIT 1;';
      const updateDateQuery =
        'UPDATE offer SET date_offer = date_offer + INTERVAL 7 DAY WHERE offer_id = ?';
      const deleteOfferQuery = 'DELETE FROM offer WHERE offer_id = ?';

      const [offers] = await db.promise().query(getOffersQuery, [now]);

      // iterate through every offer
      for (const offer of offers) {
        const [result1] = await db
          .promise()
          .query(yesterdayAVGQuery, [offer.product]);

        // in case yesterday was an avg found
        if (result1.length !== 0) {
          // check the condition
          const yesterdayAVG = result1[0].price;
          yesterdayAvgFlag =
            offer.price < yesterdayAVG - yesterdayAVG * 0.2 ?? true;
        }

        const [result2] = await db
          .promise()
          .query(weekAVGQuery, [offer.product]);

        // in case yesterday was an avg found
        if (result2.length !== 0) {
          // check the condition
          const weekAVG = result2[0].AveragePrice;
          previousWeekAvgFlag = offer.price < weekAVG - weekAVG * 0.2 ?? true;
        }

        // if any of the conditions were true, perform an update otherwise a deletion
        if (previousWeekAvgFlag === true || yesterdayAvgFlag === true)
          await db.promise().query(updateDateQuery, [offer.offer_id]);
        else await db.promise().query(deleteOfferQuery, [offer.offer_id]);
      }
    } catch (error) {
      console.error('Error perfoming daily task: ', error);
    }
  });
};
