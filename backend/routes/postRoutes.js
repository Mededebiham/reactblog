const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// Routen
router.post('/', postController.createPost);
router.get('/', postController.getAllPosts);
router.get('/title/:title', postController.getPostByTitle);
router.get('/:id', postController.getPostById);
router.delete('/:id', postController.deletePostById);
router.delete('/title/:title', postController.deletePostByTitle);
router.put('/:id', postController.updatePostById);
router.put('/title/:title', postController.updatePostByTitle);

module.exports = router;
