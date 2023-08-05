const express = require("express");

const offerController = require("./../controllers/offerController");
const { verifyToken } = require("./../middlewares/authMiddleware");

const router = express.Router();

router.get(
  "/offersByUser/:userId",
  verifyToken,
  offerController.fetchOffersByUser
);
router.get(
  "/offersByStore/:storeId",
  verifyToken,
  offerController.offersByStore
);

module.exports = router;
