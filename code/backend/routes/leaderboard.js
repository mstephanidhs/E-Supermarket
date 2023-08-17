const express = require("express");

const leaderboardController = require("./../controllers/leaderboardController");
const { verifyToken } = require("./../middlewares/authMiddleware");

const router = express.Router();

router.get(
  "/getUsers",
  verifyToken,
  leaderboardController.fetchUsersLeaderboard
);

module.exports = router;
