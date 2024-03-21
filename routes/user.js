const express = require("express");
const {createUserSettings,getUserSettings,followCommunity,followUser,unfollowUser}= require("../service/user/userService");
const { verifyToken } = require("../jwt/jwtVerification");
const router = express.Router();

router.post("/",verifyToken,createUserSettings);
router.get("/",verifyToken,getUserSettings);
router.get("/:communityId/follow/communities",verifyToken,followCommunity);
router.get("/:followerId/follow/users",verifyToken,followUser);
module.exports = router;
