// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Access denied, no token provided' });

    try {
        const user = await User.findOne({ token });

        if (!user) return res.status(401).json({ error: 'Invalid token' });

        // Check if token has expired
        if (user.tokenExpiry < new Date()) {
            return res.status(401).json({ error: 'Token expired, please login again' });
        }

        // Refresh token expiry time
        const expiry = new Date();
        expiry.setHours(expiry.getHours() + 1); // Extend expiry time by 1 hour
        user.tokenExpiry = expiry;
        await user.save();

        req.user = user; // Attach user to request object
        next();
    } catch (error) {
        res.status(400).json({ error: 'Invalid token' });
    }
};
