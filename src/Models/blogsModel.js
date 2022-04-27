const {default: mongoose} = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId
const date = new Date();
const dateStr = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`

const blogSchema = new mongoose.Schema ({
    title: {
        type: String,
        required: true
    }, 
    body: {
        type : String,
        required: true
    }, 
    authorId: {
        type: ObjectId,
        requierd: true,
        ref: "Author"
    },
    tags: {
        type: [String]
    }, 
    category: {
        type: String,
        required: true 
    }, 
    subcategory: {
        type: [String], 
    },
    deletedAt: {
        type: String,
        default: dateStr 
    }, 
    isDeleted: {
        type: Boolean, 
        default: false
    },
    publishedAt: {
        type: String,
        default: dateStr 
    }, 
    isPublished: {
        type: Boolean, 
        default: false}
        
}, {timestamps:true})

module.exports = mongoose.model('Blog', blogSchema)