const { validationResult } = require('express-validator');
const User = require('../models/User');
const Food = require('../models/Food');
const Request = require('../models/Request');

// ─────────────────────────────────────────────────────────────────────────────
// @desc    Get current user's profile with stats
// @route   GET /api/profile
// @access  Private
// ─────────────────────────────────────────────────────────────────────────────
const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).lean();

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    // Gather live stats
    const [donationsCount, requestsCount] = await Promise.all([
      Food.countDocuments({ createdBy: req.user._id }),
      Request.countDocuments({ userId: req.user._id }),
    ]);

    // Compute impact metrics
    const impact = {
      mealsShared: donationsCount * 4,
      co2Saved: +(donationsCount * 0.3).toFixed(2),
      waterSaved: donationsCount * 15,
    };

    res.status(200).json({
      success: true,
      user: {
        ...user,
        donationsCount,
        requestsCount,
        impact,
      },
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// @desc    Update current user's profile
// @route   PUT /api/profile/update
// @access  Private
// ─────────────────────────────────────────────────────────────────────────────
const updateProfile = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array()[0].msg,
      });
    }

    const { name, phone, location, bio, avatar } = req.body;

    // Prevent changing email/password via this route
    const allowedUpdates = {};
    if (name !== undefined) allowedUpdates.name = name.trim();
    if (phone !== undefined) allowedUpdates.phone = phone.trim();
    if (location !== undefined) allowedUpdates.location = location.trim();
    if (bio !== undefined) allowedUpdates.bio = bio.trim();
    if (avatar !== undefined) allowedUpdates.avatar = avatar;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: allowedUpdates },
      { new: true, runValidators: true }
    );

    console.log(`[PROFILE] Updated: ${req.user.email}`);

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully.',
      user,
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// @desc    Change user password
// @route   PUT /api/profile/change-password
// @access  Private
// ─────────────────────────────────────────────────────────────────────────────
const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Both current and new password are required.',
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 6 characters.',
      });
    }

    const user = await User.findById(req.user._id).select('+password');
    const isMatch = await user.matchPassword(currentPassword);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Current password is incorrect.' });
    }

    user.password = newPassword; // pre-save hook will re-hash
    await user.save();

    res.status(200).json({ success: true, message: 'Password changed successfully.' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getProfile, updateProfile, changePassword };
