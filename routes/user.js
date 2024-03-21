const express = require("express");
const {createUserSettings,getUserSettings,followCommunity,followUser,unfollowUser}= require("../service/user/userService");
const { verifyToken } = require("../jwt/jwtVerification");
const router = express.Router();

router.post("/",verifyToken,createUserSettings);
router.get("/",verifyToken,getUserSettings);
router.get("/follow/communities/:communityId",verifyToken,followCommunity);
router.get("/follow/users/:followerId",verifyToken,followUser);
module.exports = router;
