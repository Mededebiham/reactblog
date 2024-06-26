
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//Comments
const CommentSchema = new Schema({
    content: String,
    postId: String, //postId
    authorId: String, //AuthorId
});

module.exports = mongoose.model('Comment', CommentSchema);
