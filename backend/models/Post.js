
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    benutzername: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    content: {
        type: String,
        required: true
    },
    likes: {
        type: [String],
        default: []
    },
    tags: {
        type: [String],
        default: []
    },
    comments: {
        type: [String],
        default: []
    }

}, { timestamps: true });


module.exports = mongoose.model('Post', PostSchema);
