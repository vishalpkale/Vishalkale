const express= require("express")
const router = express.Router();
const authorController = require("../Controllers/authorController")
const blogsController = require("../Controllers/blogsController")

//createAuthor
router.post("/Author",authorController.createAuthor )

//createBlogs
router.post("/Blogs",blogsController.createBlog)

//getBlogs
router.get("/blogs", blogsController.getBlog)


router.delete("/blogs?queryparams",blogsController.deleteblog)

router.put("/blogs/:blogId",blogsController.updateBlog)
module.exports = router;