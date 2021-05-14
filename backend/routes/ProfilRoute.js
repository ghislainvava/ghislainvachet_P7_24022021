const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth');
const Profil = require('../controllers/ProfilControllers')

router.get('/profil', auth, Profil.findUser ) //chemmin pour recuperer le profil
router.put('/profil/modify',auth, Profil.modifyUserProfil )  //chemin pour modifier le profil
router.delete('/profil/modify',auth,  Profil.deleteUser)  //chemin pour supprimer le profil





module.exports = router;

