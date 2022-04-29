const express= require("express")
const router = express.Router();
const authorController = require("../Controllers/authorController")
const blogsController = require("../Controllers/blogsController")
const authorMid = require("../Middlewares/authorMiddleware")


////////////////////////////////////////(PHASE-1)/////////////////////////////////////////////////////////////

//createAuthor
router.post("/Author",authorController.createAuthor)

//createBlogs
router.post("/Blogs",authorMid.TokenValidation,authorMid.authorization, blogsController.createBlog)

//getBlogs
router.get("/blogs",authorMid.TokenValidation, blogsController.getBlog)


//UpdateBlogs
router.put("/blogs/:BlogId",authorMid.TokenValidation,authorMid.authorization, blogsController.updateBlog)

//DeleteBlogs
router.delete("/Blogs/:BlogId",authorMid.TokenValidation,authorMid.authorization, blogsController.deleteblog)    //1

router.delete("/deletedByQueryParams", blogsController.deletedByQueryParams)  //2

///////////////////////////////////////(PHASE-2)/////////////////////////////////////////////////////////////

//AuthorLogin
router.post("/login",authorController.Authorlogin)








module.exports = router;