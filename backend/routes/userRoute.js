const express = require('express');
const userCtrl = require('../controllers/userController');
const router = express.Router();
const auth = require("../middleware/auth");


router.post("/signup", userCtrl.signIn);  //chemin pour creer un utilisateur
router.post("/login", userCtrl.login);    //chemin pour se connecter

module.exports = router;
