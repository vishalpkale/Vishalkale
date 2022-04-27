const mongoose = require('mongoose')
const authorModel = require('../Models/authorModel')
const blogsModel = require('../Models/blogsModel')

const createBlog = async function (req, res) {
  try {
    const requestBody = req.body;
    if (!requestBody) {
      return res.status(400).send({
        status: false,
        message: "Invalid request parameters. Please provide blog details",
      });
    }

    //Extract params
    const { title, body, authorId, tags, category } =
      requestBody;

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
    const createdata = await blogsModel.create(requestBody)
    console.log(createdata)
    res.status(201).send({ status: true, data: createdata })
  }
  catch (error) {
    console.log(error)
    res.status(500).send({ msg: error.message })
  }
}

//////////////////// Delete Api ///////////////////////////////////////////
const deleteblog = async function (req, res) {

  try {
    let BlogId = req.params.BlogId;
    let Blog = await blogsModel.findById(BlogId);
    if (!Blog) {
      return res.status(404).send({ status: false, msg: "Does not exists" });
    }

    let deletedblog = await blogsModel.findOneAndUpdate(
      { _id: BlogId },
      { $set: { isDeleted: true } },
      { new: true },
    );

    res.status(200).send({ status: true, data: deletedblog });
  }
  catch (err) {
    console.log("This is the error :", err.message)
    res.status(500).send({ msg: "Error", error: err.message })
  };
}

let deletedByQueryParams = async function (req, res) {
  try {
    let data = req.query;

    if (data) {
      let deletedBlogsFinal = await blogsModel.updateMany(
        { $in: data },
        { $set: { isDeleted: true }, deletedAt: Date.now() },
        { new: true }
      );

      res.status(200).send({ status: true, result: deletedBlogsFinal });
    } else {
      res.status(400).send({ ERROR: "BAD REQUEST" });
    }
  } catch (err) {
    res.status(500).send({ ERROR: err.message });
  }
};


module.exports.createBlog = createBlog
module.exports.deleteblog = deleteblog
module.exports.deletedByQueryParams = deletedByQueryParams

