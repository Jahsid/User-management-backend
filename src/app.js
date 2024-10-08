// server/app.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);

app.get('/health', (req, res) => {
    res.status(200).send('Server is healthy');
  });  

module.exports = app;
