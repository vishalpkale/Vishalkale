const express= require("express")
const router = express.Router();
const authorController = require("../Controllers/authorController")
const blogsController = require("../Controllers/blogsController")

//createAuthor
router.post("/Author",authorController.createAuthor )

//createBlogs
router.post("/Blogs",blogsController.createBlog)

//getBlogs

//UpdateBlogs
router.put("/blogs/:blogId",blogsController.updateBlog)

//DeleteBlogs
router.get("/blogs", blogsController.getBlog)

router.delete("/Blogs/:BlogId",blogsController.deleteblog)

router.delete("/deletedByQueryParams",blogsController.deletedByQueryParams)

module.exports = router;