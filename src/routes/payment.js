const express = require('express');
const router = express.Router();

const PaymentController = require('../app/controllers/PaymentController');

router.get('/show', PaymentController.show);
router.get('/:id/edit', PaymentController.edit);
router.get('/:id/restore', PaymentController.restore);
router.put('/:id', PaymentController.update);
module.exports = router;