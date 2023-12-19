const express = require('express');
const router = express.Router();

const meController = require('../app/controllers/MeController');

router.get('/login', meController.login);
router.post('/login', meController.identyfy);
router.get('/logout', meController.logout);

module.exports = router;
