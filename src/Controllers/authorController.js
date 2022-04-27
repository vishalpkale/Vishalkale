const authorModel = require("../Models/authorModel")


const createAuthor = async function (req,res) {
try {
    let data = req.body;
   if (Object.keys(data).length != 0){ 
    let author = await authorModel.create(data)
    res.status(201).send({status: true, data: author})
}
    else{
        res.status(400).send({status: false, msg: "Credentials area are empty"})
    }
}
catch(error) {
    console.log(error)
    res.status(500).send({ msg: error.message })
}
}



module.exports.createAuthor= createAuthor