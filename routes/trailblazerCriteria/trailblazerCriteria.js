const express = require('express');
const { createTrailblazerCriteria } = require("../../service/trailblazerCriteria/trailblazerCriteriaService");

const router = express.Router();
router.post("/:communityId/trailblazer-criteria", createTrailblazerCriteria);
module.exports = router;

