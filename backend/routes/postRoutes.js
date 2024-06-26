const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// Routen
router.get('/', postController.getAllPosts); // GET-Anfrage, um alle Beiträge abzurufen
router.get('/:id', postController.getPostById); // GET-Anfrage, um einen Beitrag nach ID abzurufen
router.post('/', postController.createPost); // POST-Anfrage, um einen neuen Beitrag hinzuzufügen
router.put('/:id', postController.updatePost); // PUT-Anfrage, um einen Beitrag zu aktualisieren
router.delete('/', postController.deleteAllPosts); // DELETE-Anfrage, um alle Beiträge zu löschen
router.delete('/:id', postController.deletePostById); // DELETE-Anfrage, um einen Beitrag nach ID zu löschen

module.exports = router;
