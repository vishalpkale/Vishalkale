const mongoose = require('mongoose')
//const jwt = require("jsonwebtoken");
const authorModel = require('../Models/authorModel')
const blogsModel = require('../Models/blogsModel')
const date = new Date();
const dateStr = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`

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
      return res.status(400).send({ status: false, message: "Blog Title is required" });
    }
    if (!body) {
      return res.status(400).send({ status: false, message: "Blog body is required" });
    }
    if (!authorId) {
      return res.status(400).send({ status: false, message: "Author id is required" });
    }
    if (!tags) {
      return res.status(400).send({
        status: false,
        message: " tags are not valid",
      });
    }
    if (!category) {
      return res.status(400).send({ status: false, message: "Blog category is required" });
    }
    const findAuthor = await authorModel.findById(authorId);
    if (!findAuthor) {
      return res.status(400).send({ status: false, message: "Author does not exists."});
    }

    const createdata = await blogsModel.create(requestBody)

    res.status(201).send({ status: true,message: "Blog Created", data: createdata })
  }
  catch (error) {
    res.status(500).send({ msg: error.message })
  }
}
///////////////////////////////////////fetchblog////////////////////////////////////////////////////

const getBlog = async (req, res) => {
  try {
    let blogs =await blogsModel.find({isDeleted:false,isPublished:true})
    if (blogs.length === 0) {
      res.status(404).send({ status: false, msg: "no data" })
      return;
    }
    let id = req.query
    let filtered = [];
    filtered = blogs.filter((item) => {
      if (Object.keys(id).length === 0) {
        return true;
      }
      else {
        return getConditions(id, item)
      }
    })
    if (filtered.length === 0) {
      res.status(404).send({ status: false, msg: "no data" })
      return;
    }
    res.status(200).send({ status: true, count: filtered.length, data: filtered })
  }
  catch (err) {
    res.status(500).send({ Error: err.message })
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
  try {
    const requestBody = req.body;
    let blogId = req.params.blogId
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

    const updatblog = await blogsModel.findOneAndUpdate(
      { _id: blogId, isDeleted: false },//filter
      { $set: { title: title, body: body, tags: tags, subcategory: subcategory, isPublished: true, publishedAt: dateStr } },
      { new: true })
    const blogData = updatblog ?? 'Blog not found.'
    res.status(200).send({ Status: true, Data: blogData })
  }

  catch (err) {
    res.status(500).send({ msg: err.message })
  }
}

/////////////////////////////////////// Delete Api //////////////////////////////////////////////////////////////////
//1...

const deleteblog = async function (req, res) {
  try {
    let BlogId = req.params.blogId;
    
    let deletedblog = await blogsModel.findOneAndUpdate(
      { _id: BlogId, isDeleted: false },
      { $set: { isDeleted: true, deletedAt: dateStr } },
      { new: true }
    );
    
    if(deletedblog === null){
      return res.status(400).send({ status: false, msg: "Blog not found" });
    }
    else{
      return res.status(200).send({ status: true, msg: "Blog Deleted succefully" });
    }
  }
  catch (err) {
    res.status(500).send({ msg: "Error", error: err.message })
  };
}

//2...

let deletedByQueryParams = async function (req, res) {
  try {
       let loggedInUser = req.authorId;
        const queryparams = req.query;

    if (Object.keys(queryparams).length == 0) {
      return res.status(400).send({
        status: false,
        msg: "Invalid request parameters. Please provide key-value details",
      });
    }
    const blog = await blogsModel.find({ ...queryparams, isDeleted: false, authorId: loggedInUser })
    //blog not found 
    if (blog.length == 0) {
      return res.status(404).send({ status: false, message: "Blog does not exist" })
    }

    const deletedblogs = await blogsModel.updateMany({ _id: { $in: blog } }, { $set: { deletedAt: dateStr, isDeleted: true } })
    return res.status(200).send({ status: true, msg: "Deleted" });
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