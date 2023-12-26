const express = require('express');
const router = express.Router();

const popController = require('../app/controllers/PopController');

router.get('/create', popController.create);
router.post('/store', popController.store);
router.get('/renter', popController.renter);
router.get('/deleted-pops', popController.delete);
router.get('/:id/edit', popController.edit);
router.get('/:residentId/:householderId/edit', popController.edit_2);
router.get('/:id/detail', popController.detail);
router.put('/:id', popController.update);
router.put('/:residentId/:householderId/admin', popController.update_2);
router.get('/', popController.show);

module.exports = router;
