const blogs = require("../models/blogs");

//get all blogs
getAllBlogs = (req, res) => {
  res.status(200).json(blogs);
};

//get a single blog by id
getBlogById = (req, res) => {
  const id = req.params.id;
  const blog = blogs.find((blog) => blog.id === parseInt(id));
  if (!blog)
    return res.status(404).send("The blog with the given ID was not found.");
  res.status(200).json(blog);
};

//update a blog
updateBlog = (req, res) => {
  const id = req.params.id;
  const blog = blogs.find((blog) => blog.id === parseInt(id));
  if (!blog)
    return res.status(404).send("The blog with the given ID was not found.");
  const { title, content } = req.body;
  blog.title = title;
  blog.content = content;
  res.status(200).json(blog);
};

//create a blog
createBlog = (req, res) => {
  const { title, content} = req.body;
  const userId = req.userId;
  if (!title || !content || !userId)
    return res.status(400).send("Please fill in all fields.");
  const newBlog = {
    id: blogs.length + 1,
    title,
    content,
    userId,
  };
  blogs.push(newBlog);
  res.status(201).json(newBlog);
};

//delete a blog
deleteBlog = (req, res) => {
    const id = req.params.id;
    const blogIndex = blogs.findIndex((blog) => blog.id === parseInt(id));
    if (blogIndex === -1)
        return res.status(404).send("The blog with the given ID was not found.");
    blogs.splice(blogIndex, 1);
    res.status(200).json(blogs);
    };

    module.exports = {
        getAllBlogs,
        getBlogById,
        updateBlog,
        createBlog,
        deleteBlog
    };
