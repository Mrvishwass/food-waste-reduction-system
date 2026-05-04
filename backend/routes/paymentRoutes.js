const express = require('express');
const { processPayment, getPaymentHistory } = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// ── All payment routes require authentication ─────────────────────────────────
router.use(protect);

router.post('/process', processPayment);
router.get('/history', getPaymentHistory);

module.exports = router;
