const { db } = require('./../lib/dbConfig');

exports.getOfferStores = (req, res) => {
  const offerStoresQuery =
    'SELECT DISTINCT s.store_id, s.store_name, s.latitude, s.longitude FROM store s INNER JOIN offer o ON o.store = s.store_id;';

  db.query(offerStoresQuery, async (error, result) => {
    if (error) {
      console.log(error.message);
      return;
    } else if (result.length === 0)
      return res.status(404).json({
        message: 'There are no stores with available offers at the moment!',
      });
    else {
      return res.status(200).json({
        message: 'Stores with offers are fetched!',
        offerStores: result,
      });
    }
  });
};

exports.fetchStores = (req, res) => {
  const fetchStoresQuery = 'SELECT DISTINCT store_name FROM store;';

  db.query(fetchStoresQuery, async (error, result) => {
    if (error) {
      console.log(error.message);
      return;
    }

    const storesNames = [];
    result.map((res) => storesNames.push(res.store_name));

    return res.status(200).json({
      message: 'All Stores are fetched!',
      allStores: storesNames,
    });
  });
};

exports.fetchStoresByName = (req, res) => {
  const storeName = req.params.storeName;

  const fetchStoresByNameQuery =
    'SELECT s.store_id, s.store_name, s.latitude, s.longitude, o.offer_id FROM store s LEFT JOIN offer o ON s.store_id =  o.store WHERE s.store_name = ?;';

  db.query(fetchStoresByNameQuery, [storeName], async (error, result) => {
    if (error) {
      console.log(error.message);
      return;
    }

    return res.status(200).json({
      message: 'Stores with the specific name are fetched!',
      storesByName: result,
    });
  });
};

exports.fetchStoresByCategory = (req, res) => {
  const categoryId = req.params.categoryId;

  const storesByCategoryQuery =
    'SELECT s.store_id, s.store_name, s.longitude, s.latitude FROM offer o INNER JOIN product p ON p.product_id = o.product INNER JOIN store s ON s.store_id = o.store WHERE p.category = ?;';

  db.query(storesByCategoryQuery, [categoryId], async (error, result) => {
    if (error) {
      console.log(error.message);
      return;
    }

    return res.status(200).json({
      message: 'Stores by category name are fetched!',
      storesByCategory: result,
    });
  });
};
