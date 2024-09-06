// controllers/userController.js
const User = require('../models/user');
const buildQuery = require('../utils/queryBuilder')

// Create a new user
exports.createUser = async (req, res) => {
	const { email, password } = req.body;
	try {
		const newUser = new User({ email, password });
		await newUser.save();
		res.status(201).json(newUser);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// Get a single user by ID
exports.getUserById = async (req, res) => {
	const { id } = req.params;
	try {
		const user = await User.findById(id);
		if (!user) return res.status(404).json({ error: 'User not found' });
		res.status(200).json(user);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// List all users with a generic query builder
exports.listUsers = async (req, res) => {
	try {
		const { query, options, displayItems } = buildQuery(req.body ? req.body : req.query);
		let hideDisplay = { password: 0 }
		if (displayItems) hideDisplay = { ...displayItems, ...hideDisplay }
		const users = await User.find(query, hideDisplay, options); // Pass query and options to Mongoose find
		res.status(200).json(users);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Update a user by ID
exports.updateUser = async (req, res) => {
	const { id } = req.params;
	const { email, password } = req.body;
	try {
		const user = await User.findByIdAndUpdate(id, { email, password }, { new: true });
		if (!user) return res.status(404).json({ error: 'User not found' });
		res.status(200).json(user);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// Delete a user by ID
exports.deleteUser = async (req, res) => {
	const { id } = req.params;
	try {
		const user = await User.findByIdAndDelete(id);
		if (!user) return res.status(404).json({ error: 'User not found' });
		res.status(200).json({ message: 'User deleted successfully' });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};
