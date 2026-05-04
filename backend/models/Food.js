const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Food name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['vegetables', 'fruits', 'cooked', 'bakery', 'dairy', 'snacks', 'grocery', 'other'],
      lowercase: true,
    },
    quantity: {
      type: String,
      required: [true, 'Quantity is required'],
      trim: true,
    },
    servings: {
      type: Number,
      default: 1,
      min: [1, 'Servings must be at least 1'],
    },
    expiryDate: {
      type: Date,
      required: [true, 'Expiry date is required'],
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
    },
    contact: {
      type: String,
      trim: true,
    },
    imageUrl: {
      type: String,
      default: 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=400&q=80',
    },
    tags: {
      type: [String],
      default: [],
    },
    isVeg: {
      type: Boolean,
      default: true,
    },
    status: {
      type: String,
      enum: ['available', 'requested', 'completed', 'expired'],
      default: 'available',
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    pickupInstructions: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// ── Auto-mark expired items ───────────────────────────────────────────────────
foodSchema.pre('find', function () {
  // Optionally filter out truly expired items when fetching
});

// ── Virtual: isExpired ────────────────────────────────────────────────────────
foodSchema.virtual('isExpired').get(function () {
  return this.expiryDate < new Date();
});

// ── Index for fast queries ────────────────────────────────────────────────────
foodSchema.index({ status: 1, createdAt: -1 });
foodSchema.index({ category: 1 });
foodSchema.index({ createdBy: 1 });

module.exports = mongoose.model('Food', foodSchema);
