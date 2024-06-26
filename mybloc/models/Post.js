
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    id:String,
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    title: String,
    content: String,
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    tags:[{ type: Schema.Types.ObjectId, ref: 'Tags' }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]

});

module.exports = mongoose.model('Post', PostSchema);
