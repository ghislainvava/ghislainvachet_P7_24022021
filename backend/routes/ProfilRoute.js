const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth');
const Profil = require('../controllers/ProfilControllers')

router.get('/profil', auth, Profil.findUser  )
router.put('/profil/modify',auth, Profil.modifyUserProfil )
router.delete('/profil/modify',auth,  Profil.deleteUser)




module.exports = router;

