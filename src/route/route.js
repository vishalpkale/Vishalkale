const express = require('express');
const router = express.Router();
const authorController = require("../Controllers/authorController")


router.post("/Author",authorController.createAuthor )




module.exports = router;