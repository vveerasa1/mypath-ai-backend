const express = require("express");

const  { getDomains }  = require("../service/domain/domainService");

const router = express.Router();
router.get("/", getDomains);


module.exports = router;
