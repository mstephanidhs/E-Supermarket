const express = require("express");
const profileController = require("./../controllers/profileController");

const router = express.Router();

router.post("/changeUsername", profileController.changeUsername);
router.post("/changePassword", profileController.changePassword);

module.exports = router;
