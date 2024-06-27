const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Routen
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.get('/:id', userController.getUserByName);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/', userController.deleteAllUsers);
router.delete('/:id', userController.deleteUserById);
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

module.exports = router;
