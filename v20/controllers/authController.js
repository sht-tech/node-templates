// controllers/authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Generate JWT and update token expiry
const generateToken = (userId) => {
	const token = jwt.sign({ id: userId }, 'your_jwt_secret', { expiresIn: '1h' }); // Replace 'your_jwt_secret' with your secret key
	const expiry = new Date();
	expiry.setHours(expiry.getHours() + 1); // Set token expiry time to 1 hour
	return { token, expiry };
};

// Register a new user
exports.register = async (req, res) => {
	const { email, password } = req.body;
	try {
		const hashedPassword = await bcrypt.hash(password, 10);
		const newUser = new User(req.body);
		newUser.password = hashedPassword;
		await newUser.save();
		res.status(201).json({ message: 'User registered successfully' });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// Login a user with email and password
exports.login = async (req, res) => {
	const { email, password, username } = req.body;
	try {
		let user
		if(email) {
			user = await User.findOne({ email });
		} else if(username) {
			user = await User.findOne({ username });
		}
		if (!user) return res.status(404).json({ error: 'User not found' });		
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

		// Generate token and save to user
		const { token, expiry } = generateToken(user._id);
		user.token = token;
		user.tokenExpiry = expiry;
		await user.save();

		res.json({ token });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
