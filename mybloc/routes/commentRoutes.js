const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

// Routen
router.get('/:postId', commentController.getCommentsForPost); // GET-Anfrage, um alle Kommentare für einen Beitrag abzurufen
router.post('/', commentController.createComment); // POST-Anfrage, um einen neuen Kommentar hinzuzufügen
router.delete('/all/:postId', commentController.deleteAllCommentsForPost); // DELETE-Anfrage, um alle Kommentare für einen Beitrag zu löschen
router.delete('/:commentId', commentController.deleteCommentForPostById); // DELETE-Anfrage, um einen Kommentar nach ID zu löschen
router.put('/:commentId', commentController.updateCommentForPost); // PUT-Anfrage, um einen Kommentar zu aktualisieren
module.exports = router;
