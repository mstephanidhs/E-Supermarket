const schedule = require('node-schedule');
const { db } = require('./../lib/dbConfig');

exports.offerScheduler = () => {
  schedule.scheduleJob('59 23 * * *', async () => {
    try {
      // 7 days before the current day
      const now = new Date();
      now.setDate(now.getDate() - 7);

      // get all the offers that their date doesn't belong in the current week
      const getOffersQuery =
        'SELECT product, price, offer_id FROM offer WHERE date_offer <= ?';
      // get the yesterday's average
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

        const yesterdayAVG = result1[0].price;

        const [result2] = await db
          .promise()
          .query(weekAVGQuery, [offer.product]);

        const weekAVG = result2[0].pricel;

        if (
          offer.price < yesterdayAVG - yesterdayAVG * 0.2 ||
          offer.price < weekAVG - weekAVG * 0.2
        ) {
          await db.promise().query(updateDateQuery, [offer.offer_id]);
        } else {
          await db.promise().query(deleteOfferQuery, [offer.offer_id]);
        }
      }
    } catch (error) {
      console.error('Error perfoming daily task: ', error);
    }
  });
};
