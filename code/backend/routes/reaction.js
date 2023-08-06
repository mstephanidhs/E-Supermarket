const express = require("express");

const reactionController = require("./../controllers/reactionController");
const { verifyToken } = require("./../middlewares/authMiddleware");

const router = express.Router();

router.post("/insertReaction", verifyToken, reactionController.insertReaction);
router.get("/getMyReaction/:userId&:offerId", reactionController.getMyReaction);
router.put("/changeReaction", verifyToken, reactionController.changeReaction);

module.exports = router;
