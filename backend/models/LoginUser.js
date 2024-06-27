
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const LoginUserSchema = new Schema({
    username: { type: String, required: true, unique: true },

});
module.exports = mongoose.model('LoginUser', LoginUserSchema);
