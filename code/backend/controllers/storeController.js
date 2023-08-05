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

exports.getOfferStores = (req, res) => {
  const offerStoresQuery =
    "SELECT count(CASE WHEN r.is_like=1 THEN 1 END) OVER(PARTITION BY o.offer_id) AS likes, count(CASE WHEN r.is_like = 0 THEN 1 END) OVER(PARTITION BY o.offer_id) AS dislikes, s.store_id, s.store_name, s.longitude, s.latitude, o.offer_id, o.user_id, o.product, o.price, o.store, o.date_offer, o.stock, p.product_id, p.product_name, p.category, p.subcategory, p.img, r.date_reaction FROM offer o LEFT JOIN reaction r ON r.offer_id = o.offer_id INNER JOIN product p ON o.product = p.product_id INNER JOIN store s ON s.store_id = o.store;";

  db.query(offerStoresQuery, async (error, result) => {
    if (error) {
      console.log(error.message);
      return;
    } else if (result.length === 0)
      return res.status(404).json({
        message: "There are no stores with available offers at the moment!",
      });
    else {
      const offerStores = result.map((item) => {
        const stock = readBitField(item.stock);
        return {
          ...item,
          date_offer: modifyDatetimeField(item.date_offer),
          price: item.price + "€",
          stock,
        };
      });

      return res.status(200).json({
        message: "Stores with offers are fetched!",
        offerStores,
      });
    }
  });
};

exports.fetchStores = (req, res) => {
  const fetchStoresQuery = "SELECT DISTINCT store_name FROM store;";

  db.query(fetchStoresQuery, async (error, result) => {
    if (error) {
      console.log(error.message);
      return;
    }

    const storesNames = [];
    result.map((res) => storesNames.push(res.store_name));

    return res.status(200).json({
      message: "All Stores are fetched!",
      allStores: storesNames,
    });
  });
};

exports.fetchStoresByName = (req, res) => {
  const storeName = req.params.storeName;

  const fetchStoresByNameQuery =
    "SELECT count(CASE WHEN r.is_like = 1 THEN 1 END) OVER(PARTITION BY o.offer_id) AS likes, count(CASE WHEN r.is_like = 0 THEN 1 END) OVER(PARTITION BY o.offer_id) AS dislikes, s.store_id, s.store_name, s.longitude, s.latitude, o.offer_id, o.user_id, o.product, o.price, o.store, o.date_offer, o.stock, p.product_id, p.product_name, p.category, p.subcategory, p.img, r.date_reaction FROM offer o LEFT JOIN reaction r ON r.offer_id = o.offer_id LEFT JOIN product p ON o.product = p.product_id RIGHT JOIN store s ON s.store_id = o.store WHERE s.store_name = ?;";

  db.query(fetchStoresByNameQuery, [storeName], async (error, result) => {
    if (error) {
      console.log(error.message);
      return;
    }

    const storesByName = result.map((item) => {
      const stock = item.stock !== null && readBitField(item.stock);
      return {
        ...item,
        date_offer: modifyDatetimeField(item.date_offer),
        price: item.price && item.price + "€",
        stock,
      };
    });

    return res.status(200).json({
      message: "Stores with the specific name are fetched!",
      storesByName,
    });
  });
};

exports.fetchStoresByCategory = (req, res) => {
  const categoryName = req.params.category;

  const categoryIdQuery =
    "SELECT category_id FROM category WHERE category_name = ?";

  db.query(categoryIdQuery, [categoryName], async (error, result) => {
    if (error) {
      console.log(error.message);
      return;
    }

    const categoryId = result[0].category_id;
    const storesByCategoryQuery =
      "SELECT count(CASE WHEN r.is_like = 1 THEN 1 END) OVER(PARTITION BY o.offer_id) AS likes, count(CASE WHEN r.is_like = 0 THEN 1 END) OVER(PARTITION BY o.offer_id) AS dislikes, s.store_id, s.store_name, s.longitude, s.latitude, o.offer_id, o.user_id, o.product, o.price, o.store, o.date_offer, o.stock, p.product_id, p.product_name, p.category, p.subcategory, p.img, r.date_reaction FROM offer o LEFT JOIN reaction r ON r.offer_id = o.offer_id INNER JOIN product p ON o.product = p.product_id INNER JOIN store s ON s.store_id = o.store WHERE p.category = ?;";

    db.query(storesByCategoryQuery, [categoryId], async (error, result) => {
      if (error) {
        console.log(error.message);
        return;
      }

      const storesByCategory = result.map((item) => {
        const stock = item.stock && readBitField(item.stock);
        return {
          ...item,
          date_offer: modifyDatetimeField(item.date_offer),
          price: item.price && item.price + "€",
          stock,
        };
      });

      return res.status(200).json({
        message: "Stores by category name are fetched!",
        storesByCategory,
      });
    });
  });
};
