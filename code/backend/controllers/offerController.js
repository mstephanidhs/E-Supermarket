const mysql = require("mysql2");
const { modifyDatetimeField } = require("./../utils/modifeDatetimeField");
const { readBitField } = require("../utils/readBitField");

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

    const offersByUser = result.map((offer) => ({
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

exports.offersByStore = (req, res) => {
  const storeId = req.params.storeId;

  const offersByStoreQuery =
    "SELECT count(CASE WHEN r.is_like = 1 THEN 1 END) OVER(PARTITION BY o.offer_id) AS likes, count(CASE WHEN r.is_like = 0 THEN 1 END) OVER(PARTITION BY o.offer_id) AS dislikes, p.product_name, o.price, o.date_offer, o.stock, s.store_name, s.store_id, o.offer_id FROM store s INNER JOIN offer o ON s.store_id = o.store INNER JOIN product p ON o.product = p.product_id LEFT JOIN reaction  r ON r.offer_id = o.offer_id WHERE store_id = ?;";

  db.query(offersByStoreQuery, [storeId], async (error, result) => {
    if (error) {
      console.log(error.message);
      return;
    }

    const offersByStore = result.map((offer) => {
      const stock = readBitField(offer.stock);
      return {
        ...offer,
        date_offer: modifyDatetimeField(offer.date_offer),
        price: offer.price + "€",
        stock: stock === true ? "Yes" : "No",
      };
    });

    return res.status(200).json({
      message: "User offers are fetched!",
      offersByStore,
    });
  });
};

exports.offerById = (req, res) => {
  const offerId = req.params.offerId;

  const offerByIdQuery =
    "SELECT count(CASE WHEN r.is_like = 1 THEN 1 END) OVER(PARTITION BY o.offer_id) AS likes, count(CASE WHEN r.is_like = 0 THEN 1 END) OVER(PARTITION BY o.offer_id) AS dislikes, p.product_name, o.price, o.date_offer, o.stock, p.img, u.username, o.offer_id FROM offer o INNER JOIN product p ON o.product = p.product_id INNER JOIN reaction r ON r.offer_id = o.offer_id INNER JOIN user u ON o.user_id = u.user_id WHERE o.offer_id = ?";

  db.query(offerByIdQuery, [offerId], async (error, result) => {
    if (error) {
      console.log(error.message);
      return;
    }

    let offer = result[0];

    const scoreUserQuery =
      "SELECT s.current_score FROM score s INNER JOIN user u ON u.user_id = s.user_id WHERE u.username = ?;";

    db.query(scoreUserQuery, [result[0].username], async (error, result) => {
      if (error) {
        console.log(error.message);
        return;
      }

      const stock = readBitField(offer.stock);

      offer = {
        ...offer,
        score: result[0].current_score,
        stock: stock ? "Yes" : "No",
        price: offer.price + "€",
        date_offer: modifyDatetimeField(offer.date_offer),
      };

      return res.status(200).json({
        message: "Offer is fetched!",
        offer,
      });
    });
  });
};

exports.changeStockOffer = (req, res) => {
  const { stock, offerId } = req.body;

  let varStock;

  if (stock === false) varStock = 0;
  else varStock = 1;

  const updateStockQuery = "UPDATE offer SET stock = ? WHERE offer_id = ?";

  db.query(updateStockQuery, [varStock, offerId], async (error, result) => {
    if (error) {
      console.log(error.message);
      return;
    }

    return res.status(200).json({ message: "Stock changed successfully!" });
  });
};
