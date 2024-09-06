// models/role.js

const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  permissions: {
    type: [String], // Array of permissions (optional)
    default: []
  }
});

const Role = mongoose.model('Role', roleSchema);
module.exports = Role;
