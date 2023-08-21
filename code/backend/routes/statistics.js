const express = require("express");

const statisticsController = require("./../controllers/statisticsController");
const { verifyToken } = require("./../middlewares/authMiddleware");

const router = express.Router();

router.get("/:month&:year", verifyToken, statisticsController.offersByDay);

module.exports = router;
