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

module.exports.createBlog = createBlog
module.exports.getBlog = getBlog

