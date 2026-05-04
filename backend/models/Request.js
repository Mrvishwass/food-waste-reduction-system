const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
    },
    foodId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Food',
      default: null, // null = general request not tied to a specific listing
    },
    requesterName: {
      type: String,
      trim: true,
    },
    requesterPhone: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    quantity: {
      type: String,
      trim: true,
    },
    message: {
      type: String,
      trim: true,
      maxlength: [1000, 'Message cannot exceed 1000 characters'],
    },
    foodType: {
      type: String,
      default: 'any',
    },
    peopleCount: {
      type: Number,
      min: [1, 'Must be at least 1 person'],
    },
    urgency: {
      type: String,
      enum: ['low', 'medium', 'high', 'urgent'],
      default: 'medium',
    },
    pickupTime: {
      type: Date,
    },
    dietaryRestrictions: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'completed'],
      default: 'pending',
    },
    donorNote: {
      type: String,
      trim: true,
    },
    type: {
      type: String,
      enum: ['food_specific', 'general'],
      default: 'food_specific',
    },
  },
  {
    timestamps: true,
  }
);

// ── Indexes ───────────────────────────────────────────────────────────────────
requestSchema.index({ userId: 1, createdAt: -1 });
requestSchema.index({ foodId: 1 });
requestSchema.index({ status: 1 });

module.exports = mongoose.model('Request', requestSchema);
