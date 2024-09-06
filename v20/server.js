const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/indexRoutes'); // Import centralized routes

const app = express();
const cors = require("cors");
app.use(cors());
// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection string
const mongoURI = 'mongodb+srv://trinetech3:qGyTJqbvJzhCDg5f@trine.puklq.mongodb.net/test?ssl=true&replicaSet=atlas-10nh35-shard-0&authSource=admin&retryWrites=true&w=majority&appName=trine'; // Replace 'mydatabase' with your DB name

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log('MongoDB connected'))
	.catch(err => console.error('MongoDB connection error:', err));

// Use centralized routes
app.use(routes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
