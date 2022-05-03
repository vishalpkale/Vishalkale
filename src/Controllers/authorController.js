const jwt = require("jsonwebtoken");
const authorModel = require("../Models/authorModel")
const passwordValidator = require('password-validator');
const emailValidator = require('email-validator')

///////////////////////////////////////////createauthor(Phase-1)//////////////////////////////////////////////////

const createAuthor = async function (req, res) {
    try {
        let { fname, lname, title, email, password } = req.body
        const requestBody = req.body;
        if (Object.keys(requestBody).length == 0) {
            return res.status(400).send({
                status: false,
                msg: "Invalid request parameters. Please provide blog details",
            });
        }

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
            })
        }
        if (!password) {
            return res
                .status(400)
                .send({ status: false, message: "password is required" });
        }
        let titleArr = ["Mr", "Mrs", "Ms"]

        if (!titleArr.includes(title)) {
            res.status(400).send({ status: false, msg: "Title should be Mr, Mrs or Ms" })
        }

        if (!emailValidator.validate(email)) {
            return res.status(400).send({ status: false, msg: "Check the format of email" })
        }

        let emailValidation = await authorModel.findOne({ email: email })
        if (emailValidation) {
            return res.status(409).send({ status: false, msg: "This Email has been registered already" })
        }
        const schema = new passwordValidator();
        schema.is().min(8)
        if (!schema.validate(requestBody.password)) {
            return res.status(400).send({ status: false, msg: "Minimum length of password should be 8 characters" })
        }
        let data = await authorModel.create(req.body)
        return res.status(201).send({ status: true, message: "created", data: data })

    }
    catch (error) {
        return res.status(500).send({ msg: error.message })
    }
}


////////////////////////////////////////////authorlogin(Phase-2)/////////////////////////////////////////////////////

const Authorlogin = async function (req, res) {
    try {
        let requestBody = req.body
        let emailId = requestBody.email;
        let password = requestBody.password;

        if (Object.keys(requestBody).length == 0) {
            return res.status(400).send({
                status: false,
                msg: "Please provide login details",
            });
        }
        if (emailId.trim().length == 0 || password.trim().length == 0) {
            return res.status(400).send({
                status: false,
                msg: "Please provide login details",
            });
        }

        let auth1 = await authorModel.findOne({ email: emailId, password: password });

        if (!auth1)
            return res.status(401).send({
                status: false,
                msg: "Email or the password credentials are not correct",
            });

        let jwttoken = jwt.sign(
            {
                authorId: auth1._id,
                batch: "Uranium",
                organisation: "Backend Cohort",
            },
            "Uranium-Group-24"
        );
        //res.setHeader("x-auth-token", jwttoken);
        res.status(200).send({ status: true, message: "logged in", data: { token: jwttoken } });
    }

    catch (error) {
        return res.status(500).send({ msg: error.message })
    }
}

module.exports.createAuthor = createAuthor
module.exports.Authorlogin = Authorlogin