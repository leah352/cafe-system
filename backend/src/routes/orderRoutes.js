const express = require('express');
const multer = require('multer');
const { getOrders, createOrder, updateOrderStatus, verifyPayment, getOrderByNumber, getOrderLogs, cancelOrder } = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const { validateCreateOrder, validatePaymentUpdate } = require('../middleware/orderValidation');
const router = express.Router();

// Use memory storage for uploads, we'll forward buffers to Supabase storage
const upload = multer({ storage: multer.memoryStorage() });

router.get('/', authMiddleware, roleMiddleware(['admin', 'staff']), getOrders);
// Get order logs for tracking order history
router.get('/track/:order_number/logs', getOrderLogs);
// Public track endpoint by order number
router.get('/track/:order_number', getOrderByNumber);
// Accept optional payment_proof file when creating an order
router.post('/', upload.single('payment_proof'), validateCreateOrder, createOrder); // Public for customers
// Public cancel endpoint (customers can cancel with reason when allowed)
router.put('/:id/cancel', cancelOrder);
router.put('/:id/status', authMiddleware, roleMiddleware(['admin', 'staff']), updateOrderStatus);
// Admin/Staff can verify or update payment info (optional file upload)
router.put('/:id/payment', authMiddleware, roleMiddleware(['admin', 'staff']), upload.single('payment_proof'), validatePaymentUpdate, verifyPayment);

module.exports = router;
