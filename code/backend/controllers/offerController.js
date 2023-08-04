const mysql = require("mysql2");
const { modifyDatetimeField } = require("./../utils/modifeDatetimeField");

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DATABASE_PORT,
});

exports.fetchOffersByUser = (req, res) => {
  const userId = req.params.userId;

  const offersByUserQuery =
    "SELECT o.offer_id as id, p.product_name, o.price, s.store_name, o.date_offer FROM offer o INNER JOIN product p ON o.product = p.product_id INNER JOIN store s ON s.store_id = o.store WHERE o.user_id = ?;";

  db.query(offersByUserQuery, [userId], async (error, result) => {
    if (error) {
      console.log(error.message);
      return;
    }

    offersByUser = result.map((offer) => ({
      ...offer,
      date_offer: modifyDatetimeField(offer.date_offer),
      price: offer.price + "€",
    }));

    return res.status(200).json({
      message: "User offers are fetched!",
      offersByUser,
    });
  });
};
