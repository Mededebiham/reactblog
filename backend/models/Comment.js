const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    content: String,
    postid: String,
    authorid: String,
}, { timestamps: true });

module.exports = mongoose.model('Comment', CommentSchema);
