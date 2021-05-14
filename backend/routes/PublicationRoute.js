const express = require('express');
const userPublication = require('../controllers/PublicationControllers');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config')


router.post("/post", auth, multer, userPublication.posterPub); //chemin pour créer une publication
router.get("/get", auth,  userPublication.editerPub);        //chemin pour récuperer une publication
router.delete("/delete", auth, userPublication.deletePublication);  //chemin pour supprimer une publication

module.exports = router;
