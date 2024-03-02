const express = require("express");
const { createCommunity,getAllCommunities,getCommunityById } = require("../../service/community/communityService");
const  {createTrailblazerCriteria}  = require("../../service/community/trailblazerCriteria/trailblazerCriteriaService");
const { verifyToken } = require("../../jwt/jwtVerification");

const router = express.Router();
router.post("/", createCommunity);
router.post("/:communityId/trailblazer-criteria",verifyToken,createTrailblazerCriteria);
router.get("/",getAllCommunities);
router.get("/:communityId",getCommunityById);

module.exports = router;
