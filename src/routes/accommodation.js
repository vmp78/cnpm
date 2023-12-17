const express = require('express');
const router = express.Router();

const accomController = require('../app/controllers/AccomController');

router.get('/my-accommodations', accomController.show);
router.get('/create', accomController.create);
router.post('/store', accomController.store);
router.get('/:id/edit', accomController.edit);
router.get('/:id/restore', accomController.restore);
router.put('/:id', accomController.update);
router.delete('/:id', accomController.delete);
router.delete('/:id/permanent', accomController.destroy);
router.get('/deleted-accom', accomController.bin);

module.exports = router;
