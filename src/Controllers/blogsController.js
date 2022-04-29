const mongoose = require('mongoose')
const jwt = require("jsonwebtoken");
const authorModel = require('../Models/authorModel')
const blogsModel = require('../Models/blogsModel')
const authorMiddleware = require('../Middlewares/authorMiddleware')
const date = new Date();
const dateStr = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
//const auth = authorMiddleware.authorization()

///////////////////////////////////////////////createBlogs//////////////////////////////////////////////////////////////

const createBlog = async function (req, res) {
  try {
    const requestBody = req.body;
    if (Object.keys(requestBody).length == 0) {
      return res.status(400).send({
        status: false,
        msg: "Invalid request parameters. Please provide blog details",
      });
    }

    //Extract params
    const { title, body, authorId, tags, category } = requestBody;

    // Validation starts
    if (!title) {
      return res
        .status(400)
        .send({ status: false, message: "Blog Title is required" });
    }
    if (!body) {
      return res
        .status(400)
        .send({ status: false, message: "Blog body is required" });
    }
    if (!authorId) {
      return res
        .status(400)
        .send({ status: false, message: "Author id is required" });
    }
    if (!tags) {
      return res.status(400).send({
        status: false,
        message: " tags are not valid",
      });
    }
    if (!category) {
      return res
        .status(400)
        .send({ status: false, message: "Blog category is required" });
    }
    const findAuthor = await authorModel.findById(authorId);
    if (!findAuthor) {
      return res
        .status(400)
        .send({ status: false, message: `Author does not exists.` });
    }
    if (findauthor.authorId != auth) {
      res.status(404).send({ status: false, msg: "Access denied" })
    }
    const createdata = await blogsModel.create(requestBody)

    res.status(201).send({ status: true, data: createdata })
  }
  catch (error) {
    console.log(error)
    res.status(500).send({ msg: error.message })
  }
}
///////////////////////////////////////fetchblog////////////////////////////////////////////////////

const getBlog = async function (req, res) {
  try {
    let blogs = await blogsModel.find()
    let blog = []
    for (let i = 0; i < blogs.length; i++) {
      if (!blogs[i].isDeleted && blogs[i].isPublished) {
        blog.push(blogs[i])
      }
    }
    if (blog.length === 0) {
      res.status(404).send({ msg: "no data" })
      return;
    }
    let id = req.query
    let filtered = [];
    filtered = blog.filter((item) => {
      if (Object.keys(id).length === 0) {
        return true;
      }
      else {
        return getConditions(id, item)
      }
    })
    if (filtered.length === 0) {
      res.status(404).send({ msg: "no data" })
      return;
    }
    res.status(200).send({ status: true, count: filtered.length, data: filtered })
  }
  catch (err) {
    res.status(500).send({ data: err.message })
  }
}

const getConditions = (obj, item) => {
  const arr = Object.keys(obj);
  let condition = true;
  for (let key of arr) {
    if (Array.isArray(item[key])) {
      condition = condition && (item[key].includes(obj[key]))
    } else {
      condition = condition && (obj[key] == item[key])
    }
  }
  return condition;
}

//////////////////// ///////////////////////////////Update Api /////////////////////////////////////////////////////////////////////////////////

const updateBlog = async function (req, res) {
  //try {
    let jwttoken = req.headers["X-AUTH-TOKEN"];

    if (!jwttoken) {
      jwttoken = req.headers["x-auth-token"];
    }

    if (!jwttoken) {
      jwttoken = req.headers["X-Auth-Token"];
    }
    console.log(jwttoken);

    let verifyAuthor = jwt.verify(jwttoken, "FunctionUp-Uranium");

    let auth = verifyAuthor.autherId

    const requestBody = req.body;
    console.log(auth)
    if (Object.keys(requestBody).length == 0) {
      return res.status(400).send({
        status: false,
        msg: "Invalid request parameters. Please provide blog details",
      });
    }

    let title = req.body.title
    let body = req.body.body
    let tags = req.body.tags
    let subcategory = req.body.subcategory
    let blogId = req.params.blogId

    if (!blogId) { res.status(400).send({ status: false, msg: "BlogId should present" }) }
    if (!title) { res.status(400).send({ status: false, msg: "title should present" }) }
    if (!body) { res.status(400).send({ status: false, msg: "body should present" }) }
    if (!tags) { res.status(400).send({ status: false, msg: "tags should present" }) }
    if (!subcategory) { res.status(400).send({ status: false, msg: "subcategory should present" }) }


    const chkid = await blogsModel.findById({ "_id": blogId })
    if (!chkid) {
      res.status(404).send({ status: false, msg: "blog isn't available please check blog Id" })
    }
    if (chkid.isDeleted == true) {
      res.status(404).send({ status: false, msg: "The document is deleted" })
    }
    if (chkid.authorId != auth) {
      res.status(404).send({ status: false, msg: "Access denied" })
    }
    const updatblog = await blogsModel.findByIdAndUpdate(
      { _id: blogId },
      { $set: { title: title, body: body, tags: tags, subcategory: subcategory, isPublished: true, publishedAt: dateStr } },
      { new: true })
    res.status(201).send({ Status: true, Data: updatblog })
  // }
  // catch (err) {
  //   res.status(500).send({ msg: err.message })
  // }
}

/////////////////////////////////////// Delete Api //////////////////////////////////////////////////////////////////
//1...

const deleteblog = async function (req, res) {
  try {
    let BlogId = req.params.BlogId;
    let Blog = await blogsModel.findById(BlogId);
    if (!Blog) {
      return res.status(404).send({ status: false, msg: "BlogID Does not exists" });
    }
    if (Blog.authorId != auth) {
      res.status(404).send({ status: false, msg: "Access denied" })
    }
    let deletedblog = await blogsModel.findOneAndUpdate(
      { _id: BlogId },
      { $set: { isDeleted: true } },
      { new: true },
    );

    res.status(200).send({ status: true, msg: "Data Deleted succefully" });
  }
  catch (err) {
    console.log("This is the error :", err.message)
    res.status(500).send({ msg: "Error", error: err.message })
  };
}

//2...

let deletedByQueryParams = async function (req, res) {
  try {
    const queryparams = req.query;

    if (Object.keys(queryparams).length == 0) {

      return res.status(400).send({
        status: false,
        msg: "Invalid request parameters. Please provide blog details",
      });
    }

    const { category, authorId, tags, subcategory, isPublished } = queryparams
    //console.log(queryparams)

    const blog = await blogsModel.find(queryparams).select({ title: 1, _id: 0 })
    // console.log(blog)
    //.log(blog[0].title)

    //blog not found 
    if (!blog) {
      return res.status(404).send({ status: false, message: "Blog does not exist" })
    }

    //Declared empty array
    let arrayofBlogs = []
    //for loop to store all the blog to declare 
    for (let i = 0; i < blog.length; i++) {
      let blogId = blog[i].title
      arrayofBlogs.push(blogId)
    }

    const deletedblogs = await blogsModel.updateMany({ title: { $in: arrayofBlogs } }, { $set: { deletedAt: dateStr, isDeleted: true } },
      { new: true })
    //console.log(arrayofBlogs)

    res.status(200).send({ status: true, result: deletedblogs });

  }
  catch (err) {
    res.status(500).send({ ERROR: err.message });
  }
};


module.exports.createBlog = createBlog
module.exports.deleteblog = deleteblog
module.exports.deletedByQueryParams = deletedByQueryParams
module.exports.getBlog = getBlog
module.exports.updateBlog = updateBlog

