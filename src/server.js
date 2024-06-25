const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/usersdb', { useNewUrlParser: true, useUnifiedTopology: true });

const UserSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: { type: String, unique: true },
    password: String,
});

const User = mongoose.model('User', UserSchema);

// Routes
app.post('/register', async (req, res) => {
    const { firstname, lastname, email, password } = req.body;
    try {
        const newUser = new User({ firstname, lastname, email, password });
        await newUser.save();
        res.status(201).send('User registered successfully');
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).send('Email already exists');
        } else {
            res.status(500).send('Error registering user');
        }
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).send('Email not registered');
    }
    if (user.password !== password) {
        return res.status(400).send('Incorrect password');
    }
    res.send('Login successful');
});

app.get('/users', async (req, res) => {
    const users = await User.find();
    res.send(users);
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
