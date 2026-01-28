const express = require('express');
const router = express.Router();
const { readData, writeData } = require('../data/store');

// Register Endpoint
router.post('/register', (req, res) => {
    const { email, password } = req.body;
    const db = readData();

    // Check if user exists
    const userExists = db.users.find(u => u.email === email);
    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user (Simulated ID)
    const newUser = {
        id: Date.now().toString(),
        email,
        password // In real app, hash this!
    };

    db.users.push(newUser);
    writeData(db);

    res.status(201).json({ message: 'User registered successfully', user: { id: newUser.id, email: newUser.email } });
});

// Login Endpoint
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const db = readData();

    const user = db.users.find(u => u.email === email && u.password === password);

    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    // In real app, return JWT token here
    res.json({ message: 'Login successful', user: { id: user.id, email: user.email } });
});

module.exports = router;
