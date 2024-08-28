const express = require('express');
const path = require('path');
const app = express();
const studentRoutes = require('./routes/studentRoutes');

app.use(express.json());
app.use(express.static(path.join(__dirname, '../'))); // Serve static files from the root directory

// API Routes
app.use('/api/students', studentRoutes);

// Serve index.html for root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

module.exports = app;
