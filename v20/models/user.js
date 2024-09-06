// models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true }, // Change to email field
  password: { type: String, required: true },
  role: { type: String },
  token: { type: String }, // Store JWT token
  tokenExpiry: { type: Date } // Store token expiry time
});

module.exports = mongoose.model('User', UserSchema);
