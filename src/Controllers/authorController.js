const authorModel = require("../Models/authorModel")

const createAuthor = async function (req, res) {
try {
<<<<<<< HEAD
    let { fname, lname, title, email, password } = req.body

    if (!(fname && lname && title && email && password)) {
        return res.status(400).send({ status: false, data: "required(*) fields are mandatory to fill" })
=======
    let data = req.body;
   if (Object.keys(data).length != 0){ 
    let author = await authorModel.create(data)
    res.status(201).send({status: true, data: author})
}
    else{
        res.status(400).send({status: false, msg: "Credentials area are empty"})
>>>>>>> 878ce5dc9c06620a6fb010f544e2411bf088761c
    }

    // let emailValidation = await authorModel.findOne({ email : email })
    // if (!emailValidation) {
    //     return res.status(409).send({ status: false, data: "This Email has been registered already" })
    // }

    let data = await authorModel.create(req.body)
    console.log({ status: "successfully created", msg: data })
    return res.status(201).send({ status: true, data: data })

}
catch (error) {
    return res.status(500).send({ msg: error.message })
}
}

module.exports.createAuthor = createAuthor