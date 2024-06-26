
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://armandbiham:Terrasse&1982@cluster0.akzo0hm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = db;
