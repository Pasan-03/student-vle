const express = require('express');
const app = express();
const port = 3000;

// Middleware to serve static files from the 'public' directory
app.use(express.static('public'));

// Middleware to parse JSON bodies
app.use(express.json());

// Define API routes
app.use('/api/students', require('./src/routes/studentRoutes'));

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
