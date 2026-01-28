const express = require('express');
const router = express.Router();
const { readData, writeData } = require('../data/store');

// Get all transactions for a user (Simulated by passing userId in query headers for now, or just all for demo)
router.get('/', (req, res) => {
    const userId = req.headers['user-id'];
    const db = readData();

    if (!userId) return res.status(400).json({ message: 'User ID required' });

    const userTransactions = db.transactions.filter(t => t.userId === userId);
    res.json(userTransactions);
});

// Add new transaction
router.post('/', (req, res) => {
    const userId = req.headers['user-id'];
    const { type, amount, category, description, date } = req.body;

    if (!userId) return res.status(400).json({ message: 'User ID required' });

    const db = readData();
    const newTx = {
        id: Date.now().toString(),
        userId,
        type, // 'income' or 'expense'
        amount: parseFloat(amount),
        category,
        description,
        date: date || new Date().toISOString()
    };

    db.transactions.unshift(newTx); // Add to beginning
    writeData(db);

    res.status(201).json(newTx);
});

// Delete transaction
router.delete('/:id', (req, res) => {
    const userId = req.headers['user-id'];
    const { id } = req.params;
    const db = readData();

    const initialLength = db.transactions.length;
    db.transactions = db.transactions.filter(t => t.id !== id);

    if (db.transactions.length === initialLength) {
        return res.status(404).json({ message: 'Transaction not found' });
    }

    writeData(db);
    res.json({ message: 'Transaction deleted' });
});

module.exports = router;
