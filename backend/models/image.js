const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    userid: String,
    data: Buffer,
    contentType: String,
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
