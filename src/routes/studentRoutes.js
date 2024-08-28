// src/routes/studentRoutes.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const connection = require('../config/database');

// Register a new student
router.post('/register', async (req, res) => {
    const { name, grade, email, password } = req.body;

    if (!name || !grade || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Check if the email already exists
        const checkQuery = 'SELECT * FROM students WHERE email = ?';
        connection.query(checkQuery, [email], async (err, results) => {
            if (err) {
                console.error('Error checking email:', err);
                return res.status(500).json({ message: 'Internal server error' });
            }

            if (results.length > 0) {
                return res.status(409).json({ message: 'Email already exists' });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Insert into the database
            const insertQuery = 'INSERT INTO students (name, grade, email, password) VALUES (?, ?, ?, ?)';
            connection.query(insertQuery, [name, grade, email, hashedPassword], (error) => {
                if (error) {
                    console.error('Error inserting data:', error);
                    return res.status(500).json({ message: 'Internal server error' });
                }
                res.status(201).json({ message: 'Student registered successfully' });
            });
        });
    } catch (error) {
        console.error('Error hashing password:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Login student
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    const query = 'SELECT * FROM students WHERE email = ?';
    connection.query(query, [email], async (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const user = results[0];
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        res.status(200).json({ message: 'Login successful' });
    });
});

module.exports = router;
