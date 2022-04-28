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

<<<<<<< HEAD
//getBlogs
router.get("/blogs", blogsController.getBlog)
=======

>>>>>>> 8cee3f331fc79e82f07f1653173451abb9b115f0

//UpdateBlogs
router.put("/blogs/:blogId",blogsController.updateBlog)

<<<<<<< HEAD
//DeleteBlogs
router.delete("/Blogs/:BlogId",blogsController.deleteblog)    //1

router.delete("/blogs?queryparams",blogsController.deleteblog)    //2

///////////////////////////////////////(PHASE-2)/////////////////////////////////////////////////////////////

//AuthorLogin
router.post("/login",authorController.Authorlogin)
=======

router.get("/blogs", blogsController.getBlog)
>>>>>>> 8cee3f331fc79e82f07f1653173451abb9b115f0


<<<<<<< HEAD
=======
router.delete("/deletedByQueryParams",blogsController.deletedByQueryParams)
>>>>>>> 8cee3f331fc79e82f07f1653173451abb9b115f0

module.exports = router;