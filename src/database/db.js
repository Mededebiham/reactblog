/*

user = {
    id: uuid,
    vorname: string,
    nachname: string,
    email: string,
    passwort: string,
    role: string
}

post = {
    id: uuid,
    title: string,
    content: string,
    date: date,
    author: user,
    category: category[],
    comment: comment[],
    likes: number,
}

comment = {
    id: uuid,
    content: string,
    date: date,
    from: user,
}

category = {
    id: uuid,
    name: string,
    color: string,
}

*/

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
