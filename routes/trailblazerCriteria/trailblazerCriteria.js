const express = require('express');
const { createTrailblazerCriteria } = require("../../service/trailblazerCriteria/trailblazerCriteriaService");
const { verifyToken }= require("../../jwt/jwtVerification");

const router = express.Router();
router.post("/:communityId/trailblazer-criteria",verifyToken,createTrailblazerCriteria);
module.exports = router;

