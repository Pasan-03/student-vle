// src/app.js

const express = require('express');
const path = require('path');
const app = express();
const studentRoutes = require('./routes/studentRoutes');

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public'))); // Serve static files

// API Routes
app.use('/api/students', studentRoutes);

// Serve index.html for root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = app;
