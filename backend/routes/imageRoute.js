// backend/routes/imageRoute.js
const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');

// Route for uploading an image
router.post('/upload', imageController.uploadImage);

// Route for downloading an image
router.get('/download/:id', imageController.downloadImage);

module.exports = router;
