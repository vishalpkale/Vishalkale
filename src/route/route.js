const express= require("express")
const router = express.Router();
const authorController = require("../Controllers/authorController")
const blogsController = require("../Controllers/blogsController")
const authorMid = require("../Middlewares/authorMiddleware")

////////////////////////////////////////(PHASE-1)/////////////////////////////////////////////////////////////

//createAuthor
router.post("/Author",authorController.createAuthor)

//createBlogs
router.post("/Blogs",blogsController.createBlog)

//getBlogs
router.get("/blogs", blogsController.getBlog)


//UpdateBlogs
router.put("/blogs/:blogId",blogsController.updateBlog)

//DeleteBlogs
router.delete("/Blogs/:BlogId",blogsController.deleteblog)    //1

router.delete("/deletedByQueryParams",blogsController.deletedByQueryParams)  //2

///////////////////////////////////////(PHASE-2)/////////////////////////////////////////////////////////////

//AuthorLogin
router.post("/login",authorController.Authorlogin)






module.exports = router;