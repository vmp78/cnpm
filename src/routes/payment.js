const express = require('express');
const router = express.Router();

const payController = require('../app/controllers/PayController');

router.get('/show', payController.show);
router.get('/edit', payController.edit);
router.put('/update', payController.update);

module.exports = router;
