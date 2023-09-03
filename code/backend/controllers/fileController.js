const { db } = require('./../lib/dbConfig');

exports.uploadStores = (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

  const jsonData = JSON.parse(req.file.buffer.toString());
  const action = req.body.action;

  const deleteStoreTableQuery = 'DELETE FROM store;';
  // IGNORE keyword
  // in case the user selects update and a store is already inside the table
  // ignore the unique constaint, don't insert the specific row and move on to the next one
  const insertStoresQuery =
    'INSERT IGNORE INTO store(store_name, longitude, latitude) VALUES (?, ?, ?);';

  // in case the user selected deletion
  // delete all the stores inside the table in the db
  if (action === 'Delete') {
    db.query(deleteStoreTableQuery, async (error, result) => {
      if (error) {
        console.log(error.message);
        return;
      }
    });
  }

  // afterwards insert/update the data
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

  return res.status(200).json({ message: 'Stores were updated successfully!' });
};

exports.uploadProducts = (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

  const jsonData = JSON.parse(req.file.buffer.toString());
  const action = req.body.action;

  const deleteProductTableQuery = 'DELETE FROM product;';
  const insertProductsQuery =
    'INSERT IGNORE INTO product(product_id, product_name, category, subcategory, img) VALUES (?, ?, ?, ?, ?);';

  if (action === 'Delete') {
    db.query(deleteProductTableQuery, async (error, result) => {
      if (error) {
        console.log(error.message);
        return;
      }
    });
  }

  for (item of jsonData) {
    db.query(
      insertProductsQuery,
      [item.id, item.name, item.category, item.subcategory, item.image],
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
    .json({ message: 'Products were updated successfully!' });
};

exports.uploadPrices = (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

  const jsonData = JSON.parse(req.file.buffer.toString());
  const action = req.body.action;

  const deleteProductsInStoreTableQuery = 'DELETE FROM productsinstor;';
  const insertProductsInStoreQuery =
    'INSERT IGNORE INTO productsinstor(product_name, product_id, price, date_product) VALUES (?, ?, ?, ?);';

  if (action === 'Delete') {
    db.query(deleteProductsInStoreTableQuery, async (error, result) => {
      if (error) {
        console.log(error.message);
        return;
      }
    });
  }

  let id;
  let name;

  for (data of jsonData.data) {
    id = data.id;
    name = data.name;
    for (prices of data.prices) {
      db.query(
        insertProductsInStoreQuery,
        [name, id, prices.price, prices.date],
        async (error, result) => {
          if (error) {
            console.log(error.message);
            return;
          }
        }
      );
    }
  }

  return res
    .status(200)
    .json({ message: 'Products Prices were updated successfully!' });
};
