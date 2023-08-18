const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DATABASE_PORT,
});

exports.uploadStores = (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  const jsonData = JSON.parse(req.file.buffer.toString());
  const action = req.body.action;

  const deleteStoreTableQuery = "DELETE FROM stores";
  const insertStoresQuery =
    "INSERT IGNORE INTO stores(store_name, longitude, latitude) VALUES (?, ?, ?);";

  if (action === "Delete") {
    db.query(deleteStoreTableQuery, async (error, result) => {
      if (error) {
        console.log(error.message);
        return;
      }
    });
  }

  for (item of jsonData) {
    let storeName = item.properties.name
      ? item.properties.name
      : item.properties.brand;
    if (storeName === undefined) storeName = item.properties.shop;

    db.query(
      insertStoresQuery,
      [storeName, item.geometry.coordinates[0], item.geometry.coordinates[1]],
      async (error, result) => {
        if (error) {
          console.log(error.message);
          return;
        }
      }
    );
  }

  return res
    .status(200)
    .json({ message: "Stores were inserted successfully!" });
};
