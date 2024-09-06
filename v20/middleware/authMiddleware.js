// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Role = require('../models/roles');

module.exports = async (req, res, next) => {
	const token = req.header('Authorization');
	const method = req.method
	if (!token) return res.status(401).json({ error: 'Access denied, no token provided' });

	try {
		const user = await User.findOne({ token });

		if (!user) return res.status(401).json({ error: 'Invalid token' });

		// Check if token has expired
		if (user.tokenExpiry < new Date()) {
			return res.status(401).json({ error: 'Token expired, please login again' });
		}

		const role = await Role.findOne({ name: user.role });

		if (!role) return res.status(401).json({ error: 'Invalid role' });

		// role.permissions=["create", "read", "update", "delete"]
		let checkPermission = false
		switch (method) {
			case 'GET':
				checkPermission = role.permissions.includes("read")
				break;
			case 'POST':
				checkPermission = role.permissions.includes("create")
				break;
			case 'PUT':
				checkPermission = role.permissions.includes("update")
				break;
			case 'DELETE':
				checkPermission = role.permissions.includes("delete")
				break;
			default:
				checkPermission = false
		}

		console.log("role", role)
		console.log("Method", method)
		console.log("checkPermission", checkPermission)

		if (!checkPermission) return res.status(401).json({ error: 'Invalid permissions' });


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
