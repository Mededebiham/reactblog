const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb+srv://armandbiham:Terrasse&1982@cluster0.akzo0hm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB verbunden: ${conn.connection.host}`);
    } catch (err) {
        console.error(`Verbindung zu MongoDB fehlgeschlagen: ${err.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
