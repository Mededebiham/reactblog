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

module.exports = router;
