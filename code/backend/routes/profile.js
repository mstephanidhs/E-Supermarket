const express = require("express");

const profileController = require("./../controllers/profileController");
const { verifyToken } = require("./../middlewares/authMiddleware");

const router = express.Router();

router.put("/changeUsername", verifyToken, profileController.changeUsername);
router.put("/changePassword", verifyToken, profileController.changePassword);

module.exports = router;
