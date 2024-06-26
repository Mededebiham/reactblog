const express = require('express');
const router = express.Router();
const tagController = require('../controllers/tagsController');

// Routen
router.get('/', tagController.getAllTags); // GET-Anfrage, um alle Tags abzurufen
router.get('/:id', tagController.getTagById); // GET-Anfrage, um einen Tag nach ID abzurufen
router.post('/', tagController.createTag); // POST-Anfrage, um einen neuen Tag hinzuzufügen
router.put('/:id', tagController.updateTag); // PUT-Anfrage, um einen Tag zu aktualisieren
router.delete('/', tagController.deleteAllTags); // DELETE-Anfrage, um alle Tags zu löschen
router.delete('/:id', tagController.deleteTagById); // DELETE-Anfrage, um einen Tag nach ID zu löschen

module.exports = router;
