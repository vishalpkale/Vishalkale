const express= require("express")
const router = express.Router();
const authorController = require("../Controllers/authorController")
const blogsController = require("../Controllers/blogsController")
const authorMid = require("../Middlewares/authorMiddleware")

////////////////////////////////////////(PHASE-1)/////////////////////////////////////////////////////////////

//createAuthor
router.post("/authors",authorController.createAuthor)

//createBlogs
router.post("/blogs",authorMid.TokenValidation,authorMid.authorization, blogsController.createBlog)

//getBlogs
router.get("/blogs",authorMid.TokenValidation, blogsController.getBlog)

//UpdateBlogs
router.put("/blogs/:blogId",authorMid.TokenValidation,authorMid.authorization, blogsController.updateBlog)

//DeleteBlogs
router.delete("/blogs/:blogId",authorMid.TokenValidation,authorMid.authorization, blogsController.deleteblog)    //1

router.delete("/blogs",authorMid.TokenValidation, blogsController.deletedByQueryParams)  //2

///////////////////////////////////////(PHASE-2)/////////////////////////////////////////////////////////////

//AuthorLogin
router.post("/login",authorController.Authorlogin)

module.exports = router;






//  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3JJZCI6IjYyNjhlODU4NTZkY2NlODIyMzA3ZDljYiIsImJhdGNoIjoiVXJhbml1bSIsIm9yZ2FuaXNhdGlvbiI6IkJhY2tlbmQgQ29ob3J0IiwiaWF0IjoxNjUxNDY1MTM2fQ.p83kIloDVaQsj3I_XdiiEIValTg2g3atFyeHP95U7w8