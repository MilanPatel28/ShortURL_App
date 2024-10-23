const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/database');
const urlRoutes = require('./routes/urlRoutes');
const rateLimiter = require('./middleware/rateLimiter');
const config = require('./config/config');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(rateLimiter);

// Routes
app.use('/', urlRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

// Start server
app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});