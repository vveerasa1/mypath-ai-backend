const express = require("express");
const {createUserSettings,getUserSettings}= require("../service/user/userService");
const { verifyToken } = require("../jwt/jwtVerification");
const router = express.Router();

router.post("/",verifyToken,createUserSettings);
router.get("/",verifyToken,getUserSettings);
module.exports = router;
