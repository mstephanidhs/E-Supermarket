const { modifyDatetimeField } = require('./../utils/modifeDatetimeField');
const { readBitField } = require('../utils/readBitField');

const { db } = require('./../lib/dbConfig');

exports.fetchOffersByUser = (req, res) => {
  const userId = req.params.userId;

  const offersByUserQuery = `
    SELECT
	    p.product_name, o.price, o.date_offer, o.stock, s.store_name, o.offer_id as id,  
      SUM(r.is_like = 1) AS likes,
      SUM(r.is_like = 0) AS dislikes
    FROM offer o
    INNER JOIN product p ON o.product = p.product_id
    INNER JOIN store s ON o.store = s.store_id
    LEFT JOIN reaction r ON o.offer_id = r.offer_id
    WHERE o.user_id = ?
    GROUP BY o.offer_id;
  `;

  db.query(offersByUserQuery, [userId], async (error, result) => {
    if (error) {
      console.log(error.message);
      return;
    }

    const offersByUser = result.map((offer) => {
      const stock = readBitField(offer.stock);
      return {
        ...offer,
        date_offer: modifyDatetimeField(offer.date_offer),
        price: offer.price + '€',
        likes: offer.likes === null ? '-' : offer.likes,
        dislikes: offer.dislikes === null ? '-' : offer.dislikes,
        stock: stock === true ? 'Yes' : 'No',
      };
    });

    return res.status(200).json({
      message: 'User offers are fetched!',
      offersByUser,
    });
  });
};

exports.offersByStore = (req, res) => {
  const storeId = req.params.storeId;

  const offersByStoreQuery = `
  SELECT
      u.username,
      p.product_name, 
      o.price, 
      o.date_offer, 
      o.stock, 
      s.store_name, 
      s.store_id, 
      o.offer_id, 
      SUM(r.is_like = 1) AS likes,
      SUM(r.is_like = 0) AS dislikes
    FROM offer o
    INNER JOIN product p ON o.product = p.product_id
    INNER JOIN store s ON o.store = s.store_id
    INNER JOIN user u ON u.user_id = o.user_id
    LEFT JOIN reaction r ON o.offer_id = r.offer_id
    WHERE o.store = ? 
    GROUP BY o.offer_id;`;

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
        price: offer.price + '€',
        stock: stock === true ? 'Yes' : 'No',
        likes: offer.likes === null ? '-' : offer.likes,
        dislikes: offer.dislikes === null ? '-' : offer.dislikes,
      };
    });

    return res.status(200).json({
      message: 'User offers are fetched!',
      offersByStore,
    });
  });
};

exports.offerById = (req, res) => {
  const offerId = req.params.offerId;

  const offerByIdQuery =
    'SELECT count(CASE WHEN r.is_like = 1 THEN 1 END) OVER(PARTITION BY o.offer_id) AS likes, count(CASE WHEN r.is_like = 0 THEN 1 END) OVER(PARTITION BY o.offer_id) AS dislikes, p.product_name, o.price, o.date_offer, o.stock, p.img, u.username, o.offer_id, o.user_id FROM offer o INNER JOIN product p ON o.product = p.product_id LEFT JOIN reaction r ON r.offer_id = o.offer_id INNER JOIN user u ON o.user_id = u.user_id WHERE o.offer_id = ?';

  db.query(offerByIdQuery, [offerId], async (error, result) => {
    if (error) {
      console.log(error.message);
      return;
    }

    let offer = result[0];

    const scoreUserQuery =
      'SELECT s.current_score FROM score s INNER JOIN user u ON u.user_id = s.user_id WHERE u.username = ?;';

    db.query(scoreUserQuery, [result[0].username], async (error, result) => {
      if (error) {
        console.log(error.message);
        return;
      }

      const stock = readBitField(offer.stock);

      offer = {
        ...offer,
        score: result[0].current_score,
        stock: stock ? 'Yes' : 'No',
        price: offer.price + '€',
        date_offer: modifyDatetimeField(offer.date_offer),
      };

      return res.status(200).json({
        message: 'Offer is fetched!',
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

  const updateStockQuery = 'UPDATE offer SET stock = ? WHERE offer_id = ?';

  db.query(updateStockQuery, [varStock, offerId], async (error, result) => {
    if (error) {
      console.log(error.message);
      return;
    }

    return res.status(200).json({ message: 'Stock changed successfully!' });
  });
};

exports.addOffer = (req, res) => {
  const { userId, productId, price, storeId } = req.body;
  let userScore = 0;

  const offerExistsQuery =
    'SELECT MIN(price) AS price FROM offer WHERE store = ? AND product = ?';

  db.query(offerExistsQuery, [storeId, productId], async (error, result) => {
    if (error) {
      console.log(error.message);
      return;
    }

    if (result[0].price !== null) {
      if (price > result[0].price - result[0].price * 0.2) {
        return res.status(422).json({
          message:
            'The price of the product must be 20% lower than its current price.',
        });
      }
    }

    const previousDayAVGQuery =
      'SELECT price AS AveragePrice FROM productsinstore WHERE product_id = ? AND DATE(date_product) = DATE(NOW() - INTERVAL 1 DAY);';

    db.query(previousDayAVGQuery, [productId], async (error, result) => {
      if (error) {
        console.log(error.message);
        return;
      }

      if (result.length > 0) {
        console.log('adasd');
        if (price < result[0].AveragePrice - result[0].AveragePrice * 0.2) {
          userScore = 50;
        }
      }

      const previousWeekAVGQuery =
        'SELECT price AS AveragePrice FROM productsinstore WHERE product_id = ? AND date_product >= DATE(NOW() - INTERVAL 1 WEEK) AND date_product < DATE(NOW()) ORDER BY ABS(DATEDIFF(NOW(), date_product)) ASC LIMIT 1';

      db.query(previousWeekAVGQuery, [productId], async (error, result) => {
        if (error) {
          console.log(error.message);
          return;
        }

        if (result.length > 0) {
          if (price < result[0].AveragePrice - result[0].AveragePrice * 0.2) {
            userScore = userScore + 20;
          }
        }

        const addOfferQuery =
          'INSERT INTO offer(user_id, product, price, store) VALUES (?, ?, ?, ?)';

        db.query(
          addOfferQuery,
          [userId, productId, price, storeId],
          async (error, result) => {
            if (error) {
              console.log(error.message);
              return;
            }

            const updateUserScore =
              'UPDATE score SET current_score = current_score + ? WHERE user_id = ?';

            db.query(
              updateUserScore,
              [userScore, userId],
              async (error, result) => {
                if (error) {
                  console.log(error.message);
                  return;
                }

                return res.status(200).json({
                  message: `${userScore} points added to your score`,
                });
              }
            );
          }
        );
      });
    });
  });
};

exports.deleteOffer = (req, res) => {
  const { offerId } = req.params;

  const deleteOfferQuery = 'DELETE FROM offer WHERE offer_id = ?';

  db.query(deleteOfferQuery, [offerId], async (error, result) => {
    if (error) {
      console.log(error.message);
      return;
    }

    return res.status(200).json({ message: 'Offer deleted successfully!' });
  });
};
