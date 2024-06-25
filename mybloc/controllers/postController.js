
const Post = require('../models/Post');
const User = require('../models/User');

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('author').populate('comments');
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createPost = async (req, res) => {
    const { authorId, title, content } = req.body;
    try {
        const author = await User.findById(authorId);
        if (!author) {
            return res.status(404).json({ error: 'Author not found' });
        }
        const newPost = new Post({ author: authorId, title, content });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
