const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// Routen
router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);
router.get('/:id', postController.getPostByTitle);
router.post('/', postController.createPost);
router.put('/:id', postController.updatePostById);
router.delete('/', postController.updatePostByTitle);
router.delete('/:id', postController.deletePostById);
router.delete('/:id', postController.deletePostByTitle);

module.exports = router;
