const express = require('express');
const commentaireCtrl = require('../controllers/CommentaireControllers');
const router = express.Router();
const auth = require('../middleware/auth');

router.post ("/post", auth, commentaireCtrl.editComment);
router.delete("/delete", auth, commentaireCtrl.deleteComment)

module.exports = router;








