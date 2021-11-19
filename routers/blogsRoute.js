const {getAllBlogs , updateBlog , deleteBlog , createBlog ,getBlogById } = require('../controllers/blogsController');
const express = require('express');
const {auth , isOwner} = require('../Middleware/jwt');
const router = express.Router();


// GET /blogs
router.get('/blogs',getAllBlogs);
//crud
router.post('/blogs',auth ,createBlog);
router.put('/blogs/:id',auth , isOwner ,updateBlog);
router.delete('/blogs/:id',auth , isOwner ,deleteBlog);
router.get('/blogs/:id',auth , getBlogById);

module.exports = router;