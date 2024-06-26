
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: String,
    role: String, // Admin or User
    profilePicture: String,
});

module.exports = mongoose.model('User', UserSchema);
