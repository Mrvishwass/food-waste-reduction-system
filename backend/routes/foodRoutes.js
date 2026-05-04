const express = require('express');
const { body } = require('express-validator');
const {
  addFood, getAllFood, getFoodById, getMyFood, updateFoodStatus, deleteFood,
} = require('../controllers/foodController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// ── Validation ────────────────────────────────────────────────────────────────
const addFoodValidation = [
  body('name').trim().notEmpty().withMessage('Food name is required').isLength({ min: 2 }),
  body('category')
    .notEmpty()
    .withMessage('Category is required')
    .isIn(['vegetables', 'fruits', 'cooked', 'bakery', 'dairy', 'snacks', 'grocery', 'other'])
    .withMessage('Invalid category'),
  body('quantity').trim().notEmpty().withMessage('Quantity is required'),
  body('expiryDate').notEmpty().withMessage('Expiry date is required').isISO8601().withMessage('Invalid date format'),
  body('location').trim().notEmpty().withMessage('Location is required'),
];

// ── Public routes ─────────────────────────────────────────────────────────────
router.get('/all', getAllFood);
router.get('/mine', protect, getMyFood);
router.get('/:id', getFoodById);

// ── Private routes ────────────────────────────────────────────────────────────
router.post('/add', protect, addFoodValidation, addFood);
router.put('/:id/status', protect, updateFoodStatus);
router.delete('/:id', protect, deleteFood);

module.exports = router;
