const schedule = require('node-schedule');
const { db } = require('./../lib/dbConfig');

exports.offerScheduler = () => {
  schedule.scheduleJob('59 23 * * *', async () => {
    try {
      const now = new Date();
      now.setDate(now.getDate() - 7);
      let yesterdayAvgFlag = false;
      let previousWeekAvgFlag = false;

      const getOffersQuery =
        'SELECT product, price, offer_id FROM offer WHERE date_offer <= ?';
      const yesterdayAVGQuery =
        'SELECT price FROM productsinstore WHERE product_id = ? AND DATE(date_product) = DATE(NOW() - INTERVAL 1 DAY);';
      const weekAVGQuery =
        'SELECT price AS AveragePrice FROM productsinstore WHERE product_id = ? AND date_product >= DATE(NOW() - INTERVAL 1 WEEK) AND date_product < DATE(NOW()) ORDER BY ABS(DATEDIFF(NOW(), date_product)) ASC LIMIT 1;';
      const updateDateQuery =
        'UPDATE offer SET date_offer = date_offer + INTERVAL 7 DAY WHERE offer_id = ?';
      const deleteOfferQuery = 'DELETE FROM offer WHERE offer_id = ?';

      const [offers] = await db.promise().query(getOffersQuery, [now]);

      for (const offer of offers) {
        const [result1] = await db
          .promise()
          .query(yesterdayAVGQuery, [offer.product]);

        if (result1.length !== 0) {
          const yesterdayAVG = result1[0].price;
          yesterdayAvgFlag =
            offer.price < yesterdayAVG - yesterdayAVG * 0.2 ?? true;
        }

        const [result2] = await db
          .promise()
          .query(weekAVGQuery, [offer.product]);

        if (result2.length !== 0) {
          const weekAVG = result2[0].AveragePrice;
          previousWeekAvgFlag = offer.price < weekAVG - weekAVG * 0.2 ?? true;
        }

        if (previousWeekAvgFlag === true || yesterdayAVGQuery === true)
          await db.promise().query(updateDateQuery, [offer.offer_id]);
        else await db.promise().query(deleteOfferQuery, [offer.offer_id]);
      }
    } catch (error) {
      console.error('Error perfoming daily task: ', error);
    }
  });
};
