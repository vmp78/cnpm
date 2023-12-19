const express = require('express');
const router = express.Router();

const TinhtienController = require('../app/controllers/TinhtienController');

router.get('/show', TinhtienController.show);

module.exports = router;