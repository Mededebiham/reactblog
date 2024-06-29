const Image = require('../models/Image');
const sharp = require('sharp');

const uploadImage = async (req, res) => {
    if (!req.file) {
        console.error('No file uploaded');
        return res.status(400).send({ success: false, message: 'No file uploaded' });
    }

    const userid = req.body.userid;
    if (!userid) {
        console.error('No userid provided');
        return res.status(400).send({ success: false, message: 'No userid provided' });
    }

    try {
        // Komprimiere das Bild
        const compressedBuffer = await sharp(req.file.buffer)
            .resize({ width: 500 }) // Größe anpassen (optional)
            .jpeg({ quality: 80 }) // Kompressionseinstellungen
            .toBuffer();

        if (compressedBuffer.length > 125 * 1024) {
            console.error('File size after compression exceeds 125 KB');
            return res.status(400).send({ success: false, message: 'File size after compression exceeds 125 KB' });
        }

        const newImage = new Image({
            userid: userid,
            data: compressedBuffer,
            contentType: 'image/jpeg',
        });

        const savedImage = await newImage.save();
        console.log('Image saved successfully:', savedImage);
        res.status(200).send({ success: true, message: 'Image saved successfully' });
    } catch (err) {
        console.error('Error saving image to database:', err);
        res.status(500).send({ success: false, message: 'Error saving image to database', error: err });
    }
};

const getImage = async (req, res) => {
    try {
        const image = await Image.findOne({ userid: req.params.userid });
        if (!image) {
            return res.status(404).send({ success: false, message: 'Image not found' });
        }
        res.set('Content-Type', image.contentType);
        res.send(image.data);
    } catch (err) {
        console.error('Error retrieving image from database:', err);
        res.status(500).send({ success: false, message: 'Error retrieving image from database', error: err });
    }
};

module.exports = {
    uploadImage,
    getImage,
};
