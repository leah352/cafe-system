const express = require('express');
const { getStaff, createStaff, deleteStaff } = require('../controllers/staffController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const router = express.Router();

router.get('/', authMiddleware, roleMiddleware(['admin']), getStaff);
router.post('/', authMiddleware, roleMiddleware(['admin']), createStaff);
router.delete('/:id', authMiddleware, roleMiddleware(['admin']), deleteStaff);

module.exports = router;
