const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const mysql = require('mysql');
const db = require('../config/database'); // Adjust the path as needed

// Register route
router.post('/register', (req, res) => {
    const { name, grade, email, password } = req.body;

    if (!name || !grade || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const query = 'INSERT INTO students (name, grade, email, password) VALUES (?, ?, ?, ?)';
    db.query(query, [name, grade, email, hashedPassword], (error, results) => {
        if (error) {
            console.error('Error inserting data:', error);
            return res.status(500).json({ message: 'Error inserting data' });
        }
        res.status(201).json({ message: 'Student registered successfully' });
    });
});

// Login route
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    const query = 'SELECT * FROM students WHERE email = ?';
    db.query(query, [email], (error, results) => {
        if (error) {
            console.error('Error fetching data:', error);
            return res.status(500).json({ message: 'Error fetching data' });
        }
        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const student = results[0];
        const passwordMatch = bcrypt.compareSync(password, student.password);
        if (passwordMatch) {
            res.status(200).json({ message: 'Login successful' });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    });
});

module.exports = router;
