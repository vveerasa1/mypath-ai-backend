const express = require('express');
const router = express.Router();

// Import nested route files
const community =require('./community/community')
const user =require('./user/user')

// Define route handlers for nested routes
router.use('/communities', community);
router.use('/users', user);

module.exports = router;