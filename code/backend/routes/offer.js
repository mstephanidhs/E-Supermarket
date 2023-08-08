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
router.get("/:offerId", verifyToken, offerController.offerById);
router.put("/changeStockOffer", verifyToken, offerController.changeStockOffer);
router.post("/AddOffer", verifyToken, offerController.addOffer);

module.exports = router;
