const express = require('express');
const router = express.Router();

const PaymentController = require('../app/controllers/PaymentController');

router.get('/show', PaymentController.show);

module.exports = router;