const express = require("express");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage });

const fileController = require("./../controllers/fileController");
const { verifyToken } = require("./../middlewares/authMiddleware");

const router = express.Router();

router.post(
  "/stores",
  verifyToken,
  upload.single("storeFile"),
  fileController.uploadStores
);
router.post(
  "/products",
  verifyToken,
  upload.single("productFile"),
  fileController.uploadProducts
);
router.post(
  "/prices",
  verifyToken,
  upload.single("pricesFile"),
  fileController.uploadPrices
);

module.exports = router;
