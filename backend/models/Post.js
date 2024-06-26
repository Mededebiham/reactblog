
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//Posts
const PostSchema = new Schema({
    authorId:String, // der User der den post erstellt hast
    title: String,
    content: String,
    likes: [{ type:String }], //Array von UserId die post gelike haben
    tags:[{ type:String }], // Array von tagsId
    comments: [{ type:String }],// array von commentId

});

module.exports = mongoose.model('Post', PostSchema);
