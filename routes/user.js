const express = require("express");
const {createUser,getUserSettings,followCommunity,followUser,updateUser}= require("../service/user/userService");
const { verifyToken } = require("../jwt/jwtVerification");
const router = express.Router();

router.post("/",verifyToken,createUser);
router.put("/",verifyToken,updateUser);
router.get("/",verifyToken,getUserSettings);
router.get("/:communityId/follow/communities",verifyToken,followCommunity);
router.get("/:followerId/follow/users",verifyToken,followUser);
module.exports = router;
