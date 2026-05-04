const { validationResult } = require('express-validator');
const Food = require('../models/Food');
const User = require('../models/User');

// ─────────────────────────────────────────────────────────────────────────────
// @desc    Add a new food listing
// @route   POST /api/food/add
// @access  Private
// ─────────────────────────────────────────────────────────────────────────────
const addFood = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array()[0].msg,
        errors: errors.array(),
      });
    }

    const {
      name, description, category, quantity, servings,
      expiryDate, location, contact, imageUrl, tags,
      isVeg, pickupInstructions,
    } = req.body;

    const food = await Food.create({
      name,
      description,
      category,
      quantity,
      servings: servings || 1,
      expiryDate,
      location,
      contact,
      imageUrl,
      tags: tags || [],
      isVeg: isVeg !== undefined ? isVeg : true,
      pickupInstructions,
      createdBy: req.user._id,
    });

    // Increment donor's donation count
    await User.findByIdAndUpdate(req.user._id, {
      $inc: { donationsCount: 1 },
      $addToSet: { badges: 'Donor' },
    });

    await food.populate('createdBy', 'name email avatar location');

    console.log(`[FOOD] New listing added: "${food.name}" by ${req.user.email}`);

    res.status(201).json({
      success: true,
      message: 'Food listing created successfully.',
      food,
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// @desc    Get all food listings (with optional filters)
// @route   GET /api/food/all
// @access  Public
// ─────────────────────────────────────────────────────────────────────────────
const getAllFood = async (req, res, next) => {
  try {
    const { category, search, status, isVeg, sort, page = 1, limit = 20 } = req.query;

    const query = {};

    // Filter by category
    if (category && category !== 'all') {
      query.category = category;
    }

    // Filter by status
    if (status && status !== 'all') {
      query.status = status;
    } else {
      // By default only show available and requested
      query.status = { $in: ['available', 'requested'] };
    }

    // Filter by veg
    if (isVeg !== undefined && isVeg !== '') {
      query.isVeg = isVeg === 'true';
    }

    // Text search across name, description, location, tags
    if (search && search.trim()) {
      const regex = new RegExp(search.trim(), 'i');
      query.$or = [
        { name: regex },
        { description: regex },
        { location: regex },
        { tags: { $elemMatch: { $regex: regex } } },
      ];
    }

    // Sorting
    let sortObj = { createdAt: -1 }; // default: newest first
    if (sort === 'expiring') sortObj = { expiryDate: 1 };
    if (sort === 'servings') sortObj = { servings: -1 };

    const skip = (Number(page) - 1) * Number(limit);

    const [foods, total] = await Promise.all([
      Food.find(query)
        .populate('createdBy', 'name email avatar location')
        .sort(sortObj)
        .skip(skip)
        .limit(Number(limit))
        .lean(),
      Food.countDocuments(query),
    ]);

    res.status(200).json({
      success: true,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      count: foods.length,
      foods,
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// @desc    Get a single food listing by ID
// @route   GET /api/food/:id
// @access  Public
// ─────────────────────────────────────────────────────────────────────────────
const getFoodById = async (req, res, next) => {
  try {
    const food = await Food.findById(req.params.id).populate(
      'createdBy',
      'name email avatar phone location'
    );

    if (!food) {
      return res.status(404).json({ success: false, message: 'Food listing not found.' });
    }

    res.status(200).json({ success: true, food });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// @desc    Get all food listings by the logged-in user
// @route   GET /api/food/mine
// @access  Private
// ─────────────────────────────────────────────────────────────────────────────
const getMyFood = async (req, res, next) => {
  try {
    const foods = await Food.find({ createdBy: req.user._id })
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({ success: true, count: foods.length, foods });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// @desc    Update food listing status
// @route   PUT /api/food/:id/status
// @access  Private (owner only)
// ─────────────────────────────────────────────────────────────────────────────
const updateFoodStatus = async (req, res, next) => {
  try {
    const food = await Food.findById(req.params.id);

    if (!food) {
      return res.status(404).json({ success: false, message: 'Food listing not found.' });
    }

    if (food.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to update this listing.' });
    }

    const { status } = req.body;
    const valid = ['available', 'requested', 'completed', 'expired'];
    if (!valid.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status value.' });
    }

    food.status = status;
    await food.save();

    res.status(200).json({ success: true, message: 'Status updated.', food });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// @desc    Delete a food listing
// @route   DELETE /api/food/:id
// @access  Private (owner only)
// ─────────────────────────────────────────────────────────────────────────────
const deleteFood = async (req, res, next) => {
  try {
    const food = await Food.findById(req.params.id);

    if (!food) {
      return res.status(404).json({ success: false, message: 'Food listing not found.' });
    }

    if (food.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this listing.' });
    }

    await food.deleteOne();

    console.log(`[FOOD] Listing deleted: "${food.name}" by ${req.user.email}`);

    res.status(200).json({ success: true, message: 'Food listing deleted successfully.' });
  } catch (error) {
    next(error);
  }
};

module.exports = { addFood, getAllFood, getFoodById, getMyFood, updateFoodStatus, deleteFood };
