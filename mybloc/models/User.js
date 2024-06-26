
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    username: String,
    password: String,
    role: String // Admin or User
});

module.exports = mongoose.model('User', UserSchema);
