const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('../config/db');
const app = express();
const PORT = process.env.PORT || 5001;
const multer = require('multer');
const sharp = require('sharp');

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Verbindung
connectDB();

const userRoutes = require('../routes/userRoutes');
const postRoutes = require('../routes/postRoutes');
const commentRoutes = require('../routes/commentRoutes');
const tagRoutes = require('../routes/tagRoutes');
const imageRoutes = require('../routes/imageRoute');


// Benutzer, Posts, Kommentare, Tags Routen
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/tags', tagRoutes);
app.use('/api/images', imageRoutes);


// Server starten
app.listen(PORT, () => {
    console.log(`Server läuft auf Port ${PORT}`);
});
