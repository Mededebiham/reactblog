
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TagsSchema = new Schema({
    id:String,
    name: String,
    color: String,
});

module.exports = mongoose.model('Tag', TagsSchema);
