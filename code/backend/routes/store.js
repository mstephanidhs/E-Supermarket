const express = require("express");

const storeController = require("./../controllers/storeController");
const { verifyToken } = require("./../middlewares/authMiddleware");

const router = express.Router();

router.get("/getOfferStores", verifyToken, storeController.getOfferStores);
router.get("/fetchAllStores", verifyToken, storeController.fetchStores);
router.get("/:storeName", verifyToken, storeController.fetchStoresByName);

module.exports = router;
