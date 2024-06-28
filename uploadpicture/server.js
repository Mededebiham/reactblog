// server.js
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Verbindung
const mongoURI = 'mongodb+srv://armandbiham:Terrasse&1982@cluster0.akzo0hm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1); // Exit the process if connection fails
});

const imageSchema = new mongoose.Schema({
    userid:String,
    data: Buffer,
    contentType: String,
});

const Image = mongoose.model('Image', imageSchema);

// Multer setup for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Upload endpoint
app.post('/upload', upload.single('image'), async (req, res) => {
    if (!req.file) {
        console.error('No file uploaded');
        return res.status(400).send({ success: false, message: 'No file uploaded' });
    }

    const newImage = new Image({
        userid: '1234',
        data: req.file.buffer,
        contentType: req.file.mimetype,
    });

    try {
        const savedImage = await newImage.save();
        console.log('Image saved successfully:', savedImage);
        res.status(200).send({ success: true, message: 'Image saved successfully' });
    } catch (err) {
        console.error('Error saving image to database:', err);
        res.status(500).send({ success: false, message: 'Error saving image to database', error: err });
    }
});

// Get image by userid
app.get('/getpicture/:userid', async (req, res) => {
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
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
