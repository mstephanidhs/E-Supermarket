const express = require("express");

const categoriesController = require("./../controllers/categoriesController");
const { verifyToken } = require("./../middlewares/authMiddleware");

const router = express.Router();

router.get(
  "/getAllCategories",
  verifyToken,
  categoriesController.getAllCategories
);

module.exports = router;
