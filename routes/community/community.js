const express = require("express");
const { createCommunity } = require("../../service/community/communityService");
const  {createTrailblazerCriteria}  = require("../../service/community/trailblazerCriteria/trailblazerCriteriaService");

const router = express.Router();
router.post("/", createCommunity);
router.post("/:communityId/trailblazer-criteria",createTrailblazerCriteria);
module.exports = router;
