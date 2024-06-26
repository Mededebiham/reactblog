
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TagsSchema = new Schema({
    name: String,
    color: String,
});

module.exports = mongoose.model('Tag', TagsSchema);
