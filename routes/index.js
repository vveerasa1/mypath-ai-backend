const express = require('express');
const router = express.Router();

// Import nested route files
const community =require('./community')
const user =require('./user')
const domain = require('./domain');
const posts = require('./posts');


// Define route handlers for nested routes
router.use('/communities', community);
router.use('/users', user);
router.use("/domains", domain)
router.use("/posts", posts);


module.exports = router;