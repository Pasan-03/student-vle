const bcrypt = require('bcryptjs');
const db = require('../config/database');

// Register a new student
exports.registerStudent = (req, res) => {
    const { name, grade, email, password } = req.body;

    // Hash the password
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            return res.status(500).send('Error hashing password');
        }

        const sql = 'INSERT INTO students (name, grade, email, password) VALUES (?, ?, ?, ?)';
        db.query(sql, [name, grade, email, hashedPassword], (err, result) => {
            if (err) {
                return res.status(500).send('Error registering student');
            }
            res.status(200).send('Student registered successfully');
        });
    });
};

// Login a student
exports.loginStudent = (req, res) => {
    const { email, password } = req.body;

    const sql = 'SELECT * FROM students WHERE email = ?';
    db.query(sql, [email], (err, results) => {
        if (err) {
            return res.status(500).send('Error fetching student');
        }

        if (results.length === 0) {
            return res.status(400).send('Student not found');
        }

        const student = results[0];

        // Compare the hashed password
        bcrypt.compare(password, student.password, (err, isMatch) => {
            if (err) {
                return res.status(500).send('Error comparing passwords');
            }

            if (!isMatch) {
                return res.status(400).send('Incorrect password');
            }

            res.status(200).send('Student logged in successfully');
        });
    });
};
