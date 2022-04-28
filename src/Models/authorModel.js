const {default: mongoose} = require("mongoose");
require('mongoose-type-email')

const authorSchema = new mongoose.Schema ({
fname: {
      type: String,
      required: true
}, 
lname: {
    type: String,
    required: true
}, 
title: {
    type: String,
    required: true, 
    enum: ["Mr", "Mrs", "Ms"]
}, 
email: {
    type: mongoose.SchemaTypes.Email, 
    unique: true,
    required: true
}, 
password: {
    type: String,
    required: true,
} 
},{timestamps: true});

module.exports =mongoose.model('Author', authorSchema)