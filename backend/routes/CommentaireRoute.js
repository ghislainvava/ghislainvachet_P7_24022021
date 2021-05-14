const express = require('express');
const commentaireCtrl = require('../controllers/CommentaireControllers');
const router = express.Router();
const auth = require('../middleware/auth');

router.post ("/post", auth, commentaireCtrl.editComment); //chemin pour créer un commentaire
router.delete("/delete", auth, commentaireCtrl.deleteComment) //chemin pour supprimer un commentaire

module.exports = router;








