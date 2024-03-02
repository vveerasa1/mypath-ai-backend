const express = require("express");
const {createUserSettings}= require("../../service/user/userService");
const router = express.Router();

router.post("/",createUserSettings);
module.exports = router;
