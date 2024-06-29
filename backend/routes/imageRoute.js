const express = require('express');
const multer = require('multer');
const { uploadImage, getImage } = require('../controllers/imageController');

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/upload/:userid', upload.single('image'), uploadImage);
router.get('/getpicture/:userid', getImage);

module.exports = router;
