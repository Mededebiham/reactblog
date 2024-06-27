const express = require('express');
const router = express.Router();
const loginuserController = require('../controllers/loginuserController');

// Routen
router.get('/', loginuserController.getloginUser);
router.post('/', loginuserController.createLoginUser);
router.delete('/', loginuserController.deleteLoginUser);


module.exports = router;
