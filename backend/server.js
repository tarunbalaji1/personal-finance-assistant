// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Initialize the Express app
const app = express();

// Connect to the database
connectDB();

// --- Middleware ---
const frontendURL = process.env.FRONTEND_URL || 'http://localhost:3000';
app.use(cors({ origin: frontendURL }));

app.use(express.json());

// --- API Routes ---
app.get('/', (req, res) => res.send('Personal Finance API Running'));
app.use('/api/users', require('./routes/users'));
app.use('/api/transactions', require('./routes/transactions'));
app.use('/api/upload', require('./routes/upload'));

// --- Server Initialization ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));