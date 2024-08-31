// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// http://localhost:8000/api/auth/register
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
