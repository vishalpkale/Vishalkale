const authorModel = require("../Models/authorModel")


const createAuthor = async function (req,res) {
try {
   if (Object.key.length != 0){ 
    let data = req.body;
    let author = await authorModel(data)
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