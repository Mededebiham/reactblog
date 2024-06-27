
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//Comments
const CommentSchema = new Schema({
    content: String,
    postid: String, //postId
    authorid: String, //AuthorId
});

module.exports = mongoose.model('Comment', CommentSchema);
