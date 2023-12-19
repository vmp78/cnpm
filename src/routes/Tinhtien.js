const express = require('express');
const router = express.Router();

const TinhtienController = require('../app/controllers/TinhtienController');

router.get('/', TinhtienController.show);

module.exports = router;