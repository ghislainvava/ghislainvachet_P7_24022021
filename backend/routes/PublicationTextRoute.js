const express = require('express');
const publicationText = require('../controllers/PublicationTextControllers');
const router = express.Router();
const auth = require('../middleware/auth');



router.post("/post", auth, publicationText.posterPub); //chemin pour créer une publication
router.get("/get", auth,  publicationText.editerPub);        //chemin pour récuperer une publication
router.delete("/delete", auth, publicationText.deletePublication);  //chemin pour supprimer une publication

module.exports = router;