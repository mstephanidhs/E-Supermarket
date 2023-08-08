const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DATABASE_PORT,
});

exports.getAllCategories = (req, res) => {
  const getAllCategoriesQuery =
    "SELECT category_name AS label, category_id AS id FROM category";

  db.query(getAllCategoriesQuery, async (error, result) => {
    if (error) {
      console.log(error.message);
      return;
    }

    return res.status(200).json({
      message: "All Categories are fetched!",
      categories: result,
    });
  });
};

exports.getSubCategories = (req, res) => {
  const categoryId = req.params.categoryId;

  const getSubCategoriesQuery =
    "SELECT subcategory_id AS id, subcategory_name AS label FROM subcategory WHERE parent_id = ?; ";

  db.query(getSubCategoriesQuery, [categoryId], async (error, result) => {
    if (error) {
      console.log(error.message);
      return;
    }

    return res.status(200).json({
      message: "Subcategories are fetched!",
      subCategories: result,
    });
  });
};

exports.getProduct = (req, res) => {
  const { categoryId, subCategoryId } = req.params;

  const getProductQuery =
    "SELECT product_name AS label, product_id AS id FROM product WHERE category = ? AND subcategory = ?";

  db.query(
    getProductQuery,
    [categoryId, subCategoryId],
    async (error, result) => {
      if (error) {
        console.log(error.message);
        return;
      }

      return res.status(200).json({
        message: "Products are fetched!",
        products: result,
      });
    }
  );
};

exports.getAllProducts = (req, res) => {
  const getAllProductsQuery =
    "SELECT product_id AS id, product_name AS label FROM product";

  db.query(getAllProductsQuery, async (error, result) => {
    if (error) {
      console.log(error.message);
      return;
    }

    return res.status(200).json({
      message: "All products are fetched!",
      allProducts: result,
    });
  });
};
