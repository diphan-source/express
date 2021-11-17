const blogs = require('../models/blogs');

//get all blogs
exports.getAllBlogs = (req, res) => {
    res.status(200).json(blogs);
};
       