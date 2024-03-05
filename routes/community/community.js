const express = require("express");
const { createCommunity,getAllCommunities,getCommunityById } = require("../../service/community/communityService");
const  {createTrailblazerCriteria}  = require("../../service/community/trailblazerCriteria/trailblazerCriteriaService");
const { verifyToken } = require("../../jwt/jwtVerification");
const multer =require('multer');
const uploadCommunityImage = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // limit file size to 5MB
  },
});

const router = express.Router();
router.post("/",[uploadCommunityImage.single('file'),createCommunity]);
router.post("/:communityId/trailblazer-criteria",verifyToken,createTrailblazerCriteria);
router.get("/",getAllCommunities);
router.get("/:communityId",getCommunityById);

module.exports = router;
