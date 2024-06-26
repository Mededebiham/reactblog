const Post = require('../models/Post');
const User = require('../models/User');

// Controller-Methoden für Post
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('author').populate('comments'); // Alle Beiträge abrufen und Autoren und Kommentare auflösen
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getPostById = async (req, res) => {
    const postId = req.params.id;
    try {
        const post = await Post.findById(postId).populate('author').populate('comments');
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createPost = async (req, res) => {
    const { authorId, title, content,likes,tags,comments } = req.body;
    try {

        const newPost = new Post({ author: authorId, title, content,likes,tags,comments }); // Neuen Beitrag erstellen
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updatePost = async (req, res) => {
    const postId = req.params.id;
    const { title, content } = req.body;
    try {
        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { title, content },
            { new: true }
        ).populate('author').populate('comments');
        if (!updatedPost) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.json(updatedPost);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteAllPosts = async (req, res) => {
    try {
        await Post.deleteMany({});
        res.json({ message: 'All posts deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deletePostById = async (req, res) => {
    const postId = req.params.id;
    try {
        const deletedPost = await Post.findByIdAndDelete(postId);
        if (!deletedPost) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
