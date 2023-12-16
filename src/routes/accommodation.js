const express = require('express');
const router = express.Router();

const accomController = require('../app/controllers/AccomController');

router.get('/my-accommodations', accomController.show);
router.get('/create', accomController.create);
router.post('/store', accomController.store);

module.exports = router;
