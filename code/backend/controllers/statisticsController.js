const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DATABASE_PORT,
});

exports.offersByDay = (req, res) => {
  const { month, year } = req.params;

  const getOffersByDayQuery =
    "SELECT DAY(date_offer) AS day, COUNT(*) AS offer_count FROM offer WHERE YEAR(date_offer) = ? AND MONTH(date_offer) = ? GROUP BY DAY(date_offer) ORDER BY DAY(date_offer);";

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
      day: (index + 1).toString().padStart(2, "0"), // format day as two digits
      offer_count: offersPerDay[index + 1] || 0,
    }));

    return res.status(200).json({
      message:
        "Offers for the specific month and year are fetched successfully",
      offers,
    });
  });
};
