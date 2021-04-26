const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Admin = require('../controllers/AdminControllers');

router.get('/admin', auth , Admin.findAllUsers)
router.delete('/admin', auth, Admin.deleteUser)

module.exports = router;