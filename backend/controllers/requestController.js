const { validationResult } = require('express-validator');
const Request = require('../models/Request');
const Food = require('../models/Food');
const User = require('../models/User');

// ─────────────────────────────────────────────────────────────────────────────
// @desc    Create a food request
// @route   POST /api/request/create
// @access  Private
// ─────────────────────────────────────────────────────────────────────────────
const createRequest = async (req, res, next) => {
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
      foodId, message, quantity, pickupTime,
      location, foodType, peopleCount, urgency,
      dietaryRestrictions, type,
    } = req.body;

    // If requesting a specific food item, verify it exists and is available
    if (foodId) {
      const food = await Food.findById(foodId);

      if (!food) {
        return res.status(404).json({ success: false, message: 'Food listing not found.' });
      }

      if (food.status !== 'available') {
        return res.status(400).json({
          success: false,
          message: 'This food item is no longer available.',
        });
      }

      // Prevent requesting own listing
      if (food.createdBy.toString() === req.user._id.toString()) {
        return res.status(400).json({
          success: false,
          message: "You cannot request your own food listing.",
        });
      }

      // Mark food as requested
      food.status = 'requested';
      await food.save();
    }

    const request = await Request.create({
      userId: req.user._id,
      foodId: foodId || null,
      requesterName: req.user.name,
      requesterPhone: req.user.phone,
      location: location || req.user.location,
      message,
      quantity,
      pickupTime,
      foodType: foodType || 'any',
      peopleCount,
      urgency: urgency || 'medium',
      dietaryRestrictions,
      type: foodId ? 'food_specific' : 'general',
    });

    // Increment user's request count
    await User.findByIdAndUpdate(req.user._id, {
      $inc: { requestsCount: 1 },
    });

    await request.populate('foodId', 'name location imageUrl expiryDate');

    console.log(`[REQUEST] New request by ${req.user.email} — ${request.type}`);

    res.status(201).json({
      success: true,
      message: 'Request submitted successfully.',
      request,
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// @desc    Get all requests by the logged-in user
// @route   GET /api/request/my
// @access  Private
// ─────────────────────────────────────────────────────────────────────────────
const getMyRequests = async (req, res, next) => {
  try {
    const requests = await Request.find({ userId: req.user._id })
      .populate('foodId', 'name location imageUrl expiryDate status category')
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({
      success: true,
      count: requests.length,
      requests,
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// @desc    Get all requests for food items owned by the logged-in user (donor view)
// @route   GET /api/request/incoming
// @access  Private
// ─────────────────────────────────────────────────────────────────────────────
const getIncomingRequests = async (req, res, next) => {
  try {
    // Find all food IDs owned by this donor
    const myFoods = await Food.find({ createdBy: req.user._id }).select('_id');
    const foodIds = myFoods.map((f) => f._id);

    const requests = await Request.find({ foodId: { $in: foodIds } })
      .populate('userId', 'name email phone avatar')
      .populate('foodId', 'name location imageUrl')
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({ success: true, count: requests.length, requests });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// @desc    Update request status (approve/reject)
// @route   PUT /api/request/:id/status
// @access  Private (donor of the linked food)
// ─────────────────────────────────────────────────────────────────────────────
const updateRequestStatus = async (req, res, next) => {
  try {
    const { status, donorNote } = req.body;
    const valid = ['pending', 'approved', 'rejected', 'completed'];

    if (!valid.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status value.' });
    }

    const request = await Request.findById(req.params.id).populate('foodId');

    if (!request) {
      return res.status(404).json({ success: false, message: 'Request not found.' });
    }

    // Verify the requester is the donor of the food
    if (request.foodId && request.foodId.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized.' });
    }

    request.status = status;
    if (donorNote) request.donorNote = donorNote;
    await request.save();

    // If approved, mark food as completed
    if (status === 'approved' && request.foodId) {
      await Food.findByIdAndUpdate(request.foodId._id, { status: 'completed' });
    }

    res.status(200).json({ success: true, message: `Request ${status}.`, request });
  } catch (error) {
    next(error);
  }
};

module.exports = { createRequest, getMyRequests, getIncomingRequests, updateRequestStatus };
