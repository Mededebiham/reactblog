const User = require('../models/User');

// Controller-Methoden
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find(); // Alle Benutzer aus der Datenbank abrufen
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUserByName = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getUserById = async (req, res) => {
    const userid = req.params.id;
    try {
        const user = await User.findById(userid);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createUser = async (req, res) => {
    const { firstname, lastname, username, password, role,profilepicture, description} = req.body;
    try {
        const newUser = new User({ firstname, lastname, username, password, role, profilepicture, description });
        await newUser.save(); // Neuen Benutzer zur Datenbank hinzufügen
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: 'Benutzername existiert nicht' });
        }

        if (user.password !== password) {
            return res.status(400).json({ message: 'Falsches Passwort' });
        }

        // Clean user object before sending it
        const cleanUser = {
            _id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            username: user.username,
            password: user.password,
            role: user.role,
            profilepicture: user.profilepicture || null, // Default to null if not present
            description: user.description || null, // Default to null if not present
        };

        res.status(200).json({ message: 'Erfolgreich eingeloggt', user: cleanUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



exports.updateUser = async (req, res) => {
    const userid = req.params.id;
    const { firstname, lastname, username, password, role, profilepicture, description } = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(
            userid,
            { firstname, lastname, username, password, role, profilepicture, description },
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteAllUsers = async (req, res) => {
    try {
        await User.deleteMany({});
        res.json({ message: 'All users deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteUserById = async (req, res) => {
    const userid = req.params.id;
    try {
        const deletedUser = await User.findByIdAndDelete(userid);
        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
