const jwt = require("jsonwebtoken");

const TokenValidation = function(req, res, next) {

    try {
        let jwttoken = req.headers["X-AUTH-TOKEN"];

    if (!jwttoken) {
    token = req.headers["x-auth-token"];
    }

    if (!jwttoken) {
        token = req.headers["X-Auth-Token"];
        }

    if (!jwttoken) {
    return res.status(400).send({ status: false, msg: "Token must be present in headers" });
    }
    console.log(jwttoken);
}
   catch (error) {
    return res.status(500).send({ msg: error.message })
   }
}

module.exports.TokenValidation =  TokenValidation

