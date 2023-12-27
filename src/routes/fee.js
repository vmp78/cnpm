const express = require('express');
const router = express.Router();

const FeeController = require('../app/controllers/FeeController');

router.get('/create', FeeController.create);
router.post('/store', FeeController.store);
router.get('/show', FeeController.show);
router.delete('/:id/permanent', FeeController.delete);
router.get('/:id/edit', FeeController.edit);
router.get('/:id/restore', FeeController.restore);
router.put('/:id', FeeController.update);

module.exports = router;