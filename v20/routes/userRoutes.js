// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require("../middleware/authMiddleware")


// CRUD Routes
router.post('/', authMiddleware, userController.createUser);
router.get('/:id', userController.getUserById);
router.get('/', userController.listUsers);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
