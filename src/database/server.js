
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const User = require('./db');
const loginRouter = require('./login');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/login', loginRouter);

app.post('/register', async (req, res) => {
    const { vorname, nachname, email, passwort } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email bereits vorhanden' });
        }

        const newUser = new User({ vorname, nachname, email, passwort });
        await newUser.save();
        res.status(201).json({ message: 'Registrierung erfolgreich' });
    } catch (error) {
        console.error('Fehler bei der Registrierung:', error);
        res.status(500).json({ message: 'Fehler bei der Registrierung' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server läuft auf Port ${PORT}`);
});
