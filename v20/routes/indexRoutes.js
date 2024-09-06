// routes/index.route.js
const express = require('express');
const router = express.Router();

// Import routes
const roleRoutes = require('./roleRoutes');
const userRoutes = require('./userRoutes');
const authRoutes = require('./authRoutes');

// Use routes
router.use('/api/roles', roleRoutes);
router.use('/api/users', userRoutes);
router.use('/api/auth', authRoutes);

module.exports = router;
