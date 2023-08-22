const express = require("express");

const statisticsController = require("./../controllers/statisticsController");
const { verifyToken } = require("./../middlewares/authMiddleware");

const router = express.Router();

router.get("/:month&:year", verifyToken, statisticsController.offersByDay);
router.get(
  "/medianOffers/:categoryId&:subCategoryId",
  verifyToken,
  statisticsController.medianOffers
);

module.exports = router;
