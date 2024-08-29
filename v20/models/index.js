const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user");
db.role = require("./roles");

db.ROLES = ["user", "admin", "restricted", "visitor"];

module.exports = db;