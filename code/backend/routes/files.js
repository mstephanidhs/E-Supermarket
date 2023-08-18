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

module.exports = router;
