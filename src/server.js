const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb+srv://armandbiham:Terrasse&1982@cluster0.akzo0hm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true });

const UserSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: { type: String, unique: true },
    password: String,
});

const User = mongoose.model('User', UserSchema);

// Routes
app.post('/register', async (req, res) => {
    const { firstname, lastname, email, password } = req.body;
    try {
        const newUser = new User({ firstname, lastname, email, password });
        await newUser.save();
        res.status(201).send('User registered successfully');
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).send('Email already exists');
        } else {
            res.status(500).send('Error registering user');
        }
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).send('Email not registered');
    }
    if (user.password !== password) {
        return res.status(400).send('Incorrect password');
    }
    res.send('Login successful');
});

app.get('/users', async (req, res) => {
    const users = await User.find();
    res.send(users);
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
// Post Schema --------------------------------
const postSchema = new mongoose.Schema({
    id: String,
    title: String,
    content: String,
    date: Date,
    author: UserSchema,
    category: [String],
    comment: [String],
    likes: Number,
});
const Post = mongoose.model('Post', postSchema);
app.get('/api/posts', async (req, res) => {
    const posts = await db.Post.find();
    res.json(posts);
});

app.get('/api/posts/:id', async (req, res) => {
    const post = await db.Post.findOne({ id: req.params.id });
    res.json(post);
});

app.post('/api/posts', async (req, res) => {
    const post = new db.Post({ ...req.body, id: newId(), date: new Date() });
    const savedPost = await post.save();
    res.status(201).json(savedPost);
});

app.put('/api/posts/:id', async (req, res) => {
    const updatedPost = await db.Post.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
    res.json(updatedPost);
});

app.delete('/api/posts/:id', async (req, res) => {
    await db.Post.findOneAndDelete({ id: req.params.id });
    res.status(204).end();
});
// Comment Schema --------------------------------
const commentSchema = new mongoose.Schema({
    id: String,
    postId: String,
    content: String,
    date: Date,
    author: UserSchema,
});
const Comment = mongoose.model('Comment', commentSchema);
app.get('/api/comments', async (req, res) => {
    const comments = await db.Comment.find();
    res.json(comments);
});

app.get('/api/comments/:id', async (req, res) => {
    const comment = await db.Comment.findOne({ id: req.params.id });
    res.json(comment);
});

app.post('/api/comments', async (req, res) => {
    const comment = new db.Comment({ ...req.body, id: newId(), date: new Date() });
    const savedComment = await comment.save();
    res.status(201).json(savedComment);
});

app.put('/api/comments/:id', async (req, res) => {
    const updatedComment = await db.Comment.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
    res.json(updatedComment);
});

app.delete('/api/comments/:id', async (req, res) => {
    await db.Comment.findOneAndDelete({ id: req.params.id });
    res.status(204).end();
});