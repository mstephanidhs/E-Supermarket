const express = require("express");

const storeController = require("./../controllers/storeController");
const { verifyToken } = require("./../middlewares/authMiddleware");

const router = express.Router();

router.get(
  "/category/:categoryId",
  verifyToken,
  storeController.fetchStoresByCategory
);
router.get("/getOfferStores", verifyToken, storeController.getOfferStores);
router.get("/fetchAllStores", verifyToken, storeController.fetchStores);
router.get("/:storeName", verifyToken, storeController.fetchStoresByName);
router.get("/test/test", storeController.test);

module.exports = router;
