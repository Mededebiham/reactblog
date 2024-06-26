const Comment = require('../models/Comment');
const Post = require('../models/Post');
const {fetchPostById} = require("../../src/database/db");

// Controller-Methoden
exports.getCommentsForPost = async (req, res) => {
    const postId = req.params.postId; // Beitrag-ID aus der URL-Parameter lesen
    try {
        const comments = await Comment.find({ post: postId }); // Kommentare für einen bestimmten Beitrag abrufen
        res.json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createComment = async (req, res) => {
    const {  content,postId,authorId } = req.body;
    try {
        const newComment = new Comment({ content, postId,authorId });
        await newComment.save();

        const post = await fetchPostById(postId);
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

exports.deleteAllCommentsForPost = async (req, res) => {
    const postId = req.params.postId;
    try {
        await Comment.deleteMany({ post: postId }); // Löschen Sie alle Kommentare für einen bestimmten Beitrag
        // Entfernen Sie auch die Referenzen zu diesen Kommentaren im Beitrag
        await Post.findByIdAndUpdate(postId, { $set: { comments: [] } });
        res.json({ message: 'All comments for the post deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteCommentForPostById = async (req, res) => {
    const commentId = req.params.commentId;
    try {
        const deletedComment = await Comment.findByIdAndDelete(commentId); // Kommentar nach ID löschen
        if (!deletedComment) {
            return res.status(404).json({ error: 'Comment not found' });
        }
        // Entfernen Sie die Referenz des Kommentars aus dem Beitrag
        await Post.findByIdAndUpdate(deletedComment.post, { $pull: { comments: commentId } });
        res.json({ message: 'Comment deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateCommentForPost = async (req, res) => {
    const commentId = req.params.commentId;
    const { content } = req.body;
    try {
        const updatedComment = await Comment.findByIdAndUpdate(
            commentId,
            { content },
            { new: true }
        ); // Kommentar aktualisieren
        if (!updatedComment) {
            return res.status(404).json({ error: 'Comment not found' });
        }
        res.json(updatedComment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
