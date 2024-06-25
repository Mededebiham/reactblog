
const Comment = require('../models/Comment');
const Post = require('../models/Post');

exports.getCommentsForPost = async (req, res) => {
    const postId = req.params.postId;
    try {
        const comments = await Comment.find({ post: postId });
        res.json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createComment = async (req, res) => {
    const { postId, content } = req.body;
    try {
        const newComment = new Comment({ content, post: postId });
        await newComment.save();
        // Add the comment to the corresponding post
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        post.comments.push(newComment._id);
        await post.save();
        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
