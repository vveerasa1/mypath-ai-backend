const express = require('express');
const router = express.Router();

// Import nested route files
const community =require('./community/community')
// Define route handlers for nested routes
router.use('/communities', community);

module.exports = router;