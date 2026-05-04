const express = require('express');
const { body } = require('express-validator');
const { getProfile, updateProfile, changePassword } = require('../controllers/profileController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// ── Validation ────────────────────────────────────────────────────────────────
const updateValidation = [
  body('name').optional().trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('bio').optional().isLength({ max: 500 }).withMessage('Bio cannot exceed 500 characters'),
  body('phone').optional().matches(/^[+]?[\d\s\-()]{7,15}$/).withMessage('Invalid phone number'),
];

// ── All profile routes require authentication ─────────────────────────────────
router.use(protect);

router.get('/', getProfile);
router.put('/update', updateValidation, updateProfile);
router.put('/change-password', changePassword);

module.exports = router;
