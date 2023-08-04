const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DATABASE_PORT,
});

exports.getAllCategories = (req, res) => {
  const getAllCategoriesQuery = "SELECT category_name FROM category";

  db.query(getAllCategoriesQuery, async (error, result) => {
    if (error) {
      console.log(error.message);
      return;
    }

    const categories = [];
    result.map((cat) => {
      categories.push(cat.category_name);
    });

    return res.status(200).json({
      message: "All Categories are fetched!",
      categories,
    });
  });
};
