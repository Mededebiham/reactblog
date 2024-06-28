// backend/controllers/imageController.js
const Image = require('../models/image');

// Upload image
const uploadImage = async (req, res) => {
    try {
        const { data, contentType } = req.body; // Assuming image data is sent in the request body
        const image = new Image({
            data: Buffer.from(data, 'base64'), // Assuming data is base64 encoded
            contentType
        });
        await image.save();
        res.status(200).json({ message: 'Image uploaded successfully' });
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ error: 'Failed to upload image' });
    }
};

// Download image
const downloadImage = async (req, res) => {
    try {
        const image = await Image.findById(req.params.id);
        if (!image) {
            return res.status(404).json({ error: 'Image not found' });
        }
        res.set('Content-Type', image.contentType);
        res.send(image.data);
    } catch (error) {
        console.error('Error downloading image:', error);
        res.status(500).json({ error: 'Failed to download image' });
    }
};

module.exports = {
    uploadImage,
    downloadImage
};
