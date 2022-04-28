const jwt = require("jsonwebtoken");
const TokenValidation = function (req, res, next) {

    //try {
        let jwttoken = req.headers["X-AUTH-TOKEN"];

        if (!jwttoken) {
            jwttoken = req.headers["x-auth-token"];
        }

        if (!jwttoken) {
            jwttoken = req.headers["X-Auth-Token"];
        }

        if (!jwttoken) {
            return res.status(400).send({ status: false, msg: "Token must be present in headers" });
        }
        console.log(jwttoken);

        let verifyAuthor = jwt.verify(jwttoken, "FunctionUp-Uranium");

        if (!verifyAuthor) {
            return res.send({ status: false, msg: "Token is incorrect" });
        }
        req.api = true
        next();
   // }
    // catch (error) {
    //     return res.status(500).send({ msg: error.message })
    // }
}
module.exports.TokenValidation = TokenValidation

