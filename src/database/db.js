
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

mongoose.connect('mongodb://localhost:27017/reactblog', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
    vorname: String,
    nachname: String,
    email: { type: String, unique: true },
    passwort: String,
});

userSchema.pre('save', async function (next) {
    if (this.isModified('passwort') || this.isNew) {
        this.passwort = await bcrypt.hash(this.passwort, 10);
    }
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
