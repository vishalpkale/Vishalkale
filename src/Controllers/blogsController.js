const mongoose=require('mongoose')
const authorModel=require('../Models/authorModel')
const blogsModel=require('../Models/blogsModel')

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
      const { title, body, authorId, tags, category} =
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
      res.status(201).send({status: true, data: createdata})
    }
    catch(error) {
        console.log(error)
        res.status(500).send({ msg: error.message })
    }
}
    
module.exports.createBlog = createBlog

