const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, 'database.json');

// Read data
const readData = () => {
    try {
        const data = fs.readFileSync(DB_PATH, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        // If file doesn't exist or is invalid, return default structure
        return { users: [], transactions: [] };
    }
};

// Write data
const writeData = (data) => {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
};

module.exports = { readData, writeData };
