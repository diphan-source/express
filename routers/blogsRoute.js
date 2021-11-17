const {getAllBlogs} = require('../controllers/blogsController');
const express = require('express');
const router = express.Router();


// GET /blogs
router.get('/blogs',getAllBlogs);

module.exports = router;