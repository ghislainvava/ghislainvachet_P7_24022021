const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Admin = require('../controllers/AdminControllers');

router.get('/admin', auth , Admin.findAllUsers) //chemin pour afficher tout les utilisateurs
router.delete('/admin', auth, Admin.deleteUser) //chemin pour supprimer un utilisateur
module.exports = router;