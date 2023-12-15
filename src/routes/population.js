const express = require('express');
const router = express.Router();

const popController = require('../app/controllers/PopController');

router.get('/create', popController.create);

module.exports = router;
