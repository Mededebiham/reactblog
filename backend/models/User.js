
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//user
const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    username: String,
    password: String,
    role: String, // Admin or User
    profilePicture: String,
});

module.exports = mongoose.model('User', UserSchema);
