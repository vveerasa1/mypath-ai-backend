const express = require("express");
const { createCommunity } = require("../../service/community/communityService");
const router = express.Router();
router.post("/", createCommunity);
module.exports = router;
