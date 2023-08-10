const express = require("express");

const profileController = require("./../controllers/profileController");
const { verifyToken } = require("./../middlewares/authMiddleware");

const router = express.Router();

router.put("/changeUsername", verifyToken, profileController.changeUsername);
router.put("/changePassword", verifyToken, profileController.changePassword);
router.get("/getScores/:userId", verifyToken, profileController.getScores);
router.get("/getTokens/:userId", verifyToken, profileController.getTokens);
router.get(
  "/getReactions/:userId",
  verifyToken,
  profileController.getReactions
);

module.exports = router;
