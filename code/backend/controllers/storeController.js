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
    "SELECT s.store_id, s.store_name, s.latitude, s.longitude FROM store s INNER JOIN offer o ON o.store = s.store_id;";

  db.query(offerStoresQuery, async (error, result) => {
    if (error) {
      console.log(error.message);
      return;
    } else if (result.length === 0)
      return res.status(404).json({
        message: "There are no stores with available offers at the moment!",
      });
    else {
      return res.status(200).json({
        message: "Stores with offers are fetched!",
        offerStores: result,
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
    "SELECT s.store_id, s.store_name, s.latitude, s.longitude, o.offer_id FROM store s LEFT JOIN offer o ON s.store_id =  o.store WHERE s.store_name = ?;";

  db.query(fetchStoresByNameQuery, [storeName], async (error, result) => {
    if (error) {
      console.log(error.message);
      return;
    }

    return res.status(200).json({
      message: "Stores with the specific name are fetched!",
      storesByName: result,
    });
  });
};

exports.fetchStoresByCategory = (req, res) => {
  const categoryId = req.params.categoryId;

  const storesByCategoryQuery =
    "SELECT s.store_id, s.store_name, s.longitude, s.latitude FROM offer o INNER JOIN product p ON p.product_id = o.product INNER JOIN store s ON s.store_id = o.store WHERE p.category = ?;";

  db.query(storesByCategoryQuery, [categoryId], async (error, result) => {
    if (error) {
      console.log(error.message);
      return;
    }

    return res.status(200).json({
      message: "Stores by category name are fetched!",
      storesByCategory: result,
    });
  });
};

exports.test = async (req, res) => {
  const now = new Date();
  now.setDate(now.getDate() - 7);

  const [rows] = await db
    .promise()
    .query("SELECT * FROM offer WHERE date_offer <= ?", [now]);

  for (const row of rows) {
    const [result1] = await db
      .promise()
      .query(
        "SELECT price AS AveragePrice FROM productsinstore WHERE product_id = ? AND DATE(date_product) = DATE(NOW() - INTERVAL 1 DAY);",
        [row.product]
      );

    const price1 = result1[0].AveragePrice;
    console.log("w21", price1);

    const [result2] = await db
      .promise()
      .query(
        "SELECT price AS AveragePrice FROM productsinstore WHERE product_id = ? AND date_product >= DATE(NOW() - INTERVAL 1 WEEK) AND date_product < DATE(NOW()) ORDER BY ABS(DATEDIFF(NOW(), date_product)) ASC LIMIT 1",
        [row.product]
      );

    if (
      row.price < result1[0].AveragePrice - result1[0].AveragePrice * 0.2 ||
      row.price < result2[0].AveragePrice - result2[0].AveragePrice * 0.2
    ) {
      const [result] = await db
        .promise()
        .query(
          "UPDATE offer SET date_offer = date_offer + INTERVAL 7 DAY WHERE offer_id = ?",
          [row.offer_id]
        );
    } else {
    }
  }

  res.json(rows);
};
