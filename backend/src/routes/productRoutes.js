const express = require('express');
const multer = require('multer');
const upload = multer();
const { getProducts, createProduct, updateProduct, deleteProduct, uploadProductImage } = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const { validate } = require('../middleware/validation');
const router = express.Router();

router.get('/', getProducts);
router.post('/', authMiddleware, roleMiddleware(['admin']), validate('createProduct'), createProduct);
router.post('/upload', authMiddleware, roleMiddleware(['admin']), upload.single('image'), uploadProductImage);
router.put('/:id', authMiddleware, roleMiddleware(['admin']), validate('updateProduct'), updateProduct);
router.delete('/:id', authMiddleware, roleMiddleware(['admin']), deleteProduct);

module.exports = router;
