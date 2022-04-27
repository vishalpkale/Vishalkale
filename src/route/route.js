<<<<<<< HEAD
const express= require("express")
=======
const express = require('express');
>>>>>>> 878ce5dc9c06620a6fb010f544e2411bf088761c
const router = express.Router();
const authorController = require("../Controllers/authorController")
const blogsController = require("../Controllers/blogsController")

//createAuthor
router.post("/Author",authorController.createAuthor )

//createBlogs
router.post("/Blogs",blogsController.createBlog)





module.exports = router;