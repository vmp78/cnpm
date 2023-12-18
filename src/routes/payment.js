const express = require('express');
const router = express.Router();

const payController = require('../app/controllers/PayController');

router.get('/show', payController.show);

module.exports = router;
