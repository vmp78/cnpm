const express = require('express');
const multer = require('multer');
const router = express.Router();

const storage = multer.memoryStorage(); // Lưu trữ file trong bộ nhớ đệm
const upload = multer({ storage: storage });
const popController = require('../app/controllers/PopController');

router.get('/:id/create', popController.create);
router.get('/:id/restore', popController.restore);
router.post('/store', popController.store);
router.get('/renter', popController.renter);
// router.get('/deleted-pops', popController.delete);
router.get('/deleted-pops', popController.bin);
router.get('/:id/edit', popController.edit);
router.get('/:residentId/edit-2', popController.edit_2);
router.get('/:houseId/detail', popController.detail);
router.put('/:id', popController.update);
router.put('/:residentId/admin', popController.update_2);
router.get('/', popController.show);
router.delete('/:id', popController.delete);
router.delete('/:id/permanent', popController.destroy);
router.post('/search', popController.search);
router.get('/export', popController.export);
router.post('/:houseId/import', upload.single('fileImport'), popController.import);

module.exports = router;
