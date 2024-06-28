const Comment = require('../models/Comment');
const Post = require('../models/Post');

// Controller-Methoden
exports.getCommentsForPost = async (req, res) => {
    const postid = req.params.postid; // Beitrag-ID aus der URL-Parameter lesen
    try {
        const comments = await Comment.find({ post: postid }); // Kommentare für einen bestimmten Beitrag abrufen
        res.json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getCommentById = async (req, res) => {
    const commentId = req.params.commentId;
    try {
        const comment = await Comment.findById(commentId);
        console.log('Fetched comment:', comment); // Debugging line
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.status(200).json(comment); // Return the comment object directly
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createComment = async (req, res) => {
    const { content, postid, authorid } = req.body;
    try {
        const newComment = new Comment({ content, postid, authorid });
        await newComment.save();

        const post = await Post.findById(postid);
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
    const postid = req.params.postid;
    try {
        await Comment.deleteMany({ post: postid }); // Löschen Sie alle Kommentare für einen bestimmten Beitrag
        // Entfernen Sie auch die Referenzen zu diesen Kommentaren im Beitrag
        await Post.findByIdAndUpdate(postid, { $set: { comments: [] } });
        res.json({ message: 'All comments for the post deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteCommentForPostById = async (req, res) => {
    const commentId = req.params.commentId;
    console.log(`Received request to delete comment with id: ${commentId}`); // Debug log
    try {
        const deletedComment = await Comment.findByIdAndDelete(commentId);
        if (!deletedComment) {
            console.log(`Comment with id ${commentId} not found`); // Debug log
            return res.status(404).json({ error: 'Comment not found' });
        }
        await Post.findByIdAndUpdate(deletedComment.postid, { $pull: { comments: commentId } });
        console.log(`Comment with id ${commentId} deleted successfully`); // Debug log
        res.json({ message: 'Comment deleted successfully' });
    } catch (error) {
        console.error('Error deleting comment:', error); // Debug log
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
