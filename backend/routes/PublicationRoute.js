const express = require('express');
const userPublication = require('../controllers/PublicationControllers');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config')


router.post("/post", auth, multer, userPublication.posterPub);
router.get("/get", auth,  userPublication.editerPub);
router.delete("/delete", auth, userPublication.deletePublication);



module.exports = router;
