const express = require('express');
const { getSalesReport } = require('../controllers/reportController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const router = express.Router();

router.get('/sales', authMiddleware, roleMiddleware(['admin']), getSalesReport);

module.exports = router;
