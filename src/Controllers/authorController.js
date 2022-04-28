const authorModel = require("../Models/authorModel")

const createAuthor = async function (req, res) {
try {
    let { fname, lname, title, email, password } = req.body
    const requestBody = req.body;
    if (Object.keys(requestBody).length==0) {
      return res.status(400).send({
        status: false,
        msg: "Invalid request parameters. Please provide blog details",
      });
    }

    // if (!(fname && lname && title && email && password)) {
    //     return res.status(400).send({ status: false, data: "required(*) fields are mandatory to fill" })
    
    if (!fname) {
        return res
          .status(400)
          .send({ status: false, message: "fname is required" });
      }
      if (!lname) {
        return res
          .status(400)
          .send({ status: false, message: "lname is required" });
      }
      if (!title) {
        return res
          .status(400)
          .send({ status: false, message: "title is required" });
      }
      if (!email) {
        return res.status(400).send({
          status: false,
          message: " email is required",
        })}
        if (!password) {
            return res
              .status(400)
              .send({ status: false, message: "password is required" });
          }
    
    let emailValidation = await authorModel.findOne({ email : email })
    if (emailValidation) {
        return res.status(409).send({ status: false, data: "This Email has been registered already" })
    }

    let data = await authorModel.create(req.body)
    console.log({ status: "successfully created", msg: data })
    return res.status(201).send({ status: true, data: data })

}
catch (error) {
    return res.status(500).send({ msg: error.message })
}
}

module.exports.createAuthor = createAuthor
