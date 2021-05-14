const express = require('express');
const commentaireTextCtrl = require('../controllers/CommentaireTextControllers');
const router = express.Router();
const auth = require('../middleware/auth');

router.post ("/post", auth, commentaireTextCtrl.editComment); //chemin pour créer un commentaire
router.delete("/delete", auth, commentaireTextCtrl.deleteComment) //chemin pour supprimer un commentaire

module.exports = router;
