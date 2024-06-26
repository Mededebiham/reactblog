const express = require('express');
const router = express.Router();
const tagController = require('../controllers/tagsController');

// Routen
router.get('/', tagController.getAllTags);
router.get('/:id', tagController.getTagById);
router.get('/:id', tagController.getTagByName);
router.post('/', tagController.createTag);
router.put('/:id', tagController.updateTag);
router.delete('/', tagController.deleteAllTags);
router.delete('/:id', tagController.deleteTagById);

module.exports = router;
