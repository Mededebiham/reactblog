const User = require('../models/LoginUser');

// Controller-Methoden
exports.getloginUser = async (req, res) => {
    try {
        const users = await User.find(); // Alle Benutzer aus der Datenbank abrufen
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.createLoginUser = async (req, res) => {
    const { username} = req.body;
    try {
        const newUser = new User({ username,});
        await newUser.save(); // Neuen Benutzer zur Datenbank hinzufügen
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteLoginUser = async (req, res) => {
    try {
        await User.deleteMany({});
        res.json({ message: 'All users deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
