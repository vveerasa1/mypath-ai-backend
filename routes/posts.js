const express = require("express");
const  { createPosts,getAllPosts, likeapost,flagapost}= require("../service/posts/postService");
const {createComment,getAllComments}=require("../service/posts/comments/comments")
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
router.get("/:userId",getAllPosts);
router.get("/:postId/like",verifyToken,likeapost);
router.get("/:postId/flag",verifyToken,flagapost);
router.post("/:postId/comments",createComment);
router.get("/:postId/comments",getAllComments);

module.exports = router;
