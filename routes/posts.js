const express = require("express");
const  { createPosts,getAllPosts, likeapost }= require("../service/posts/postService");
const multer =require('multer');
const { verifyToken } = require("../jwt/jwtVerification");
const router = express.Router();

const file = multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 5 * 1024 * 1024, // limit file size to 5MB
    },
  });
router.post("/",[file.single('file'), createPosts]);
router.get("/",verifyToken,getAllPosts);
router.get("/like/:postId",verifyToken,likeapost);

module.exports = router;
