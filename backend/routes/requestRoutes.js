const express = require('express');
const { body } = require('express-validator');
const {
  createRequest, getMyRequests, getIncomingRequests, updateRequestStatus,
} = require('../controllers/requestController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// ── Validation ────────────────────────────────────────────────────────────────
const createRequestValidation = [
  body('message')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Message cannot exceed 1000 characters'),
  body('urgency')
    .optional()
    .isIn(['low', 'medium', 'high', 'urgent'])
    .withMessage('Invalid urgency level'),
  body('peopleCount')
    .optional()
    .isInt({ min: 1 })
    .withMessage('People count must be at least 1'),
];

// ── All request routes require authentication ─────────────────────────────────
router.use(protect);

router.post('/create', createRequestValidation, createRequest);
router.get('/my', getMyRequests);
router.get('/incoming', getIncomingRequests);
router.put('/:id/status', updateRequestStatus);

module.exports = router;
