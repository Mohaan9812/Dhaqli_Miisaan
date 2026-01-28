const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

const path = require('path');

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files (HTML, CSS, JS) from the root directory
app.use(express.static(path.join(__dirname, '../')));

// Routes
const authRoutes = require('./routes/auth');
const transactionRoutes = require('./routes/transactions');

app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);

// Serve index.html for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
