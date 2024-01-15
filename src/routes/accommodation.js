const express = require('express');
const multer = require('multer');
const router = express.Router();

const storage = multer.memoryStorage(); // Lưu trữ file trong bộ nhớ đệm
const upload = multer({ storage: storage });
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
router.get('/export', accomController.export);
router.post('/import', upload.single('fileImport') , accomController.import);

module.exports = router;
