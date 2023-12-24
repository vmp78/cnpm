const express = require('express');
const router = express.Router();

const FeeController = require('../app/controllers/FeeController');

router.get('/', FeeController.show);
router.get('/statistics', FeeController.statistics);
router.get('/create', FeeController.create);

module.exports = router;