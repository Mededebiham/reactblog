// backend/login.js
const express = require('express');
const User = require('./db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();
const secret = 'your_jwt_secret'; // Geheimschlüssel für JWT

router.post('/login', async (req, res) => {
    const { email, passwort } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Ungültige Email oder Passwort' });
        }

        const isMatch = await bcrypt.compare(passwort, user.passwort);
        if (!isMatch) {
            return res.status(401).json({ message: 'Ungültige Email oder Passwort' });
        }

        const token = jwt.sign({ id: user._id }, secret, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login erfolgreich', token });
    } catch (error) {
        console.error('Fehler bei der Anmeldung:', error);
        res.status(500).json({ message: 'Fehler bei der Anmeldung' });
    }
});

module.exports = router;
