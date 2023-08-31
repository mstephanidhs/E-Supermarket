const { db } = require('./../lib/dbConfig');

exports.offersByDay = (req, res) => {
  const { month, year } = req.params;

  const getOffersByDayQuery =
    'SELECT DAY(date_offer) AS day, COUNT(*) AS offer_count FROM offer WHERE YEAR(date_offer) = ? AND MONTH(date_offer) = ? GROUP BY DAY(date_offer) ORDER BY DAY(date_offer);';

  db.query(getOffersByDayQuery, [year, month], async (error, result) => {
    if (error) {
      console.log(error.message);
      return;
    }

    // determine the number of days in the specified month
    const monthDays = new Date(year, month, 0).getDate();

    // an object to store offer counts for each day
    const offersPerDay = {};

    // populate the object with the data given from the query
    result.forEach((offer) => {
      offersPerDay[offer.day] = offer.offer_count;
    });

    // create an array with objects for each day of the month, filling in missing days with zero offer counts
    const offers = Array.from({ length: monthDays }, (_, index) => ({
      day: (index + 1).toString().padStart(2, '0'), // format day as two digits
      offer_count: offersPerDay[index + 1] || 0,
    }));

    return res.status(200).json({
      message:
        'Offers for the specific month and year are fetched successfully',
      offers,
    });
  });
};

exports.medianOffers = (req, res) => {
  const { categoryId, subCategoryId } = req.params;

  const AVGProductQuery = `SELECT product_id, 
      DAY(date_product) AS day_of_month,
      price AS AveragePrice
        FROM (
              SELECT product_id, 
                  date_product,
                  price,
                  ROW_NUMBER() OVER (PARTITION BY product_id ORDER BY date_product DESC) AS rn
              FROM productsinstore
              WHERE category = ?
                    AND date_product >= DATE(NOW() - INTERVAL 1 WEEK)
                    AND date_product < DATE(NOW())
            ) ranked_products
      WHERE rn = 1;`;

  const categoryProductsQuery = `SELECT AVG(o.price) AS average_price FROM offer o INNER JOIN product p ON o.product = p.product_id WHERE p.category = ?;`;

  if (subCategoryId === '-1') {
    db.query(categoryProductsQuery, [categoryId], async (error, result) => {
      if (error) {
        console.log(error.message);
        return;
      }
      if (result[0].average_price === null)
        return res.status(204).json({
          message:
            'No current offers for the products of the specific category',
        });

      const averagePrice = result[0].average_price;

      db.query(AVGProductQuery, [categoryId], async (error, result) => {
        if (error) {
          console.log(error.message);
          return;
        }

        const offersPreviousWeek = result.map((item) => {
          return {
            ...item,
            AveragePrice: averagePrice - item.AveragePrice,
          };
        });

        const currentDate = new Date();
        const currentDay = currentDate.getDate();

        const daysInWeek = 7;
        const previousWeekDays = [];

        for (let i = currentDay - daysInWeek; i < currentDay; i++)
          previousWeekDays.push(i);

        const existingDays = offersPreviousWeek.map(
          (offer) => offer.day_of_month
        );

        const missingDays = previousWeekDays.filter(
          (day) => !existingDays.includes(day)
        );

        const defaultEntry = {
          product_id: -1,
          day_of_month: 0,
          AveragePrice: 0,
        };

        const missingData = missingDays.map((day) => ({
          ...defaultEntry,
          day_of_month: day,
        }));

        const finalOffers = offersPreviousWeek
          .concat(missingData)
          .sort((a, b) => a.day_of_month - b.day_of_month);

        return res.status(200).json({ finalOffers });
      });
    });
  } else {
    const AVGProductSubcategoryQuery = `SELECT product_id, 
    DAY(date_product) AS day_of_month,
    price AS AveragePrice
      FROM (
            SELECT product_id, 
                date_product,
                price,
                ROW_NUMBER() OVER (PARTITION BY product_id ORDER BY date_product DESC) AS rn
            FROM productsinstore
            WHERE category = ? AND subcategory = ?
                  AND date_product >= DATE(NOW() - INTERVAL 1 WEEK)
                  AND date_product < DATE(NOW())
          ) ranked_products
    WHERE rn = 1;`;

    const categoryAndSubcategoryProductsQuery = `SELECT AVG(o.price) AS average_price FROM offer o INNER JOIN product p ON o.product = p.product_id WHERE p.category = ? AND subcategory = ?;`;

    db.query(
      categoryAndSubcategoryProductsQuery,
      [categoryId, subCategoryId],
      async (error, result) => {
        if (error) {
          console.log(error.message);
          return;
        }

        if (result[0].average_price === null)
          return res.status(204).json({
            message:
              'No current offers for the products of the specific category',
          });

        const averagePrice = result[0].average_price;

        db.query(
          AVGProductSubcategoryQuery,
          [categoryId, subCategoryId],
          async (error, result) => {
            if (error) {
              console.log(error.message);
              return;
            }

            const offersPreviousWeek = result.map((item) => {
              return {
                ...item,
                AveragePrice: averagePrice - item.AveragePrice,
              };
            });

            const currentDate = new Date();
            const currentDay = currentDate.getDate();

            const daysInWeek = 7;
            const previousWeekDays = [];

            for (let i = currentDay - daysInWeek; i < currentDay; i++)
              previousWeekDays.push(i);

            const existingDays = offersPreviousWeek.map(
              (offer) => offer.day_of_month
            );

            const missingDays = previousWeekDays.filter(
              (day) => !existingDays.includes(day)
            );

            const defaultEntry = {
              product_id: -1,
              day_of_month: 0,
              AveragePrice: 0,
            };

            const missingData = missingDays.map((day) => ({
              ...defaultEntry,
              day_of_month: day,
            }));

            const finalOffers = offersPreviousWeek
              .concat(missingData)
              .sort((a, b) => a.day_of_month - b.day_of_month);

            return res.status(200).json({ finalOffers });
          }
        );
      }
    );
  }
};
