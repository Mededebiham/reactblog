const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

// Routes
router.get('/:postId', commentController.getCommentsForPost); // GET request to get all comments for a post
router.post('/', commentController.createComment); // POST request to add a new comment
router.delete('/all/:postId', commentController.deleteAllCommentsForPost); // DELETE request to delete all comments for a post
router.delete('/:commentId', commentController.deleteCommentForPostById); // DELETE request to delete a comment by ID
router.put('/:commentId', commentController.updateCommentForPost); // PUT request to update a comment

module.exports = router;
