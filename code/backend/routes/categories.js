const express = require("express");

const categoriesController = require("./../controllers/categoriesController");
const { verifyToken } = require("./../middlewares/authMiddleware");

const router = express.Router();

router.get(
  "/getAllCategories",
  verifyToken,
  categoriesController.getAllCategories
);
router.get(
  "/getSubCategories/:categoryId",
  verifyToken,
  categoriesController.getSubCategories
);
router.get(
  "/products/:categoryId&:subCategoryId",
  verifyToken,
  categoriesController.getProduct
);
router.get("/allProducts", verifyToken, categoriesController.getAllProducts);

module.exports = router;
