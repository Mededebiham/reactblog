const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Routen
router.get('/', userController.getAllUsers); // GET-Anfrage, um alle Benutzer abzurufen
router.get('/:id', userController.getUserById); // GET-Anfrage, um einen Benutzer nach ID abzurufen
router.post('/', userController.createUser); // POST-Anfrage, um einen neuen Benutzer hinzuzufügen
router.put('/:id', userController.updateUser); // PUT-Anfrage, um einen Benutzer zu aktualisieren
router.delete('/', userController.deleteAllUsers); // DELETE-Anfrage, um alle Benutzer zu löschen
router.delete('/:id', userController.deleteUserById); // DELETE-Anfrage, um einen Benutzer nach ID zu löschen

module.exports = router;
