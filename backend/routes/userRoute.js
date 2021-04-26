const express = require('express');
const userCtrl = require('../controllers/userController');
const router = express.Router();
const auth = require('../middleware/auth');
const Profil = require('../controllers/ProfilControllers')

router.post("/signup", userCtrl.signIn);
router.post('/login', userCtrl.login);
router.get('/profil', Profil.findUser  )
module.exports = router;
