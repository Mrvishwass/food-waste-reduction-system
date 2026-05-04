/**
 * Seed Script — run with: npm run seed
 * Populates MongoDB with sample users and food items.
 */

require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const connectDB = require('../config/db');
const User = require('../models/User');
const Food = require('../models/Food');
const Request = require('../models/Request');

const SAMPLE_USERS = [
  {
    name: 'Alex Johnson',
    email: 'alex@foodshare.com',
    password: 'password123',
    role: 'donor',
    phone: '+91 98765 43210',
    location: 'Koramangala, Bangalore',
    bio: 'Food enthusiast and sustainability advocate. Fighting food waste one meal at a time.',
    badges: ['New Member', 'Top Donor', 'Community Hero'],
    donationsCount: 12,
    requestsCount: 3,
  },
  {
    name: 'Priya Sharma',
    email: 'priya@foodshare.com',
    password: 'password123',
    role: 'donor',
    phone: '+91 90000 11111',
    location: 'HSR Layout, Bangalore',
    bio: 'Home cook who loves sharing food with the community.',
    badges: ['New Member', 'Donor'],
    donationsCount: 5,
    requestsCount: 1,
  },
  {
    name: 'Rahul Mehta',
    email: 'rahul@foodshare.com',
    password: 'password123',
    role: 'user',
    phone: '+91 80000 22222',
    location: 'BTM Layout, Bangalore',
    bio: 'Student helping families get access to food.',
    badges: ['New Member'],
    donationsCount: 0,
    requestsCount: 4,
  },
  {
    name: 'Admin User',
    email: 'admin@foodshare.com',
    password: 'admin123',
    role: 'admin',
    badges: ['New Member', 'Admin'],
  },
];

const getSampleFood = (donorIds) => [
  {
    name: 'Fresh Organic Vegetables Pack',
    description: 'A variety of seasonal organic vegetables including carrots, spinach, tomatoes, and bell peppers. All freshly harvested.',
    category: 'vegetables',
    quantity: '5 kg',
    servings: 10,
    expiryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    location: 'Koramangala, Bangalore',
    contact: '+91 98765 43210',
    imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&q=80',
    tags: ['organic', 'fresh', 'vegan'],
    isVeg: true,
    status: 'available',
    createdBy: donorIds[0],
  },
  {
    name: 'Home-cooked Biryani',
    description: 'Made too much biryani for a family gathering. Aromatic basmati rice with spices. Available for pickup tonight.',
    category: 'cooked',
    quantity: '3 portions',
    servings: 3,
    expiryDate: new Date(Date.now() + 8 * 60 * 60 * 1000),
    location: 'HSR Layout, Bangalore',
    contact: '+91 90000 11111',
    imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&q=80',
    tags: ['cooked', 'spicy', 'vegetarian'],
    isVeg: true,
    status: 'available',
    createdBy: donorIds[1],
  },
  {
    name: 'Bakery Bread & Pastries',
    description: 'End of day surplus from our bakery. Fresh sourdough loaves, croissants, and Danish pastries.',
    category: 'bakery',
    quantity: '12 pieces',
    servings: 12,
    expiryDate: new Date(Date.now() + 12 * 60 * 60 * 1000),
    location: 'Indiranagar, Bangalore',
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80',
    tags: ['bakery', 'fresh', 'surplus'],
    isVeg: true,
    status: 'available',
    createdBy: donorIds[0],
  },
  {
    name: 'Mixed Fruit Basket',
    description: 'Assorted seasonal fruits: mangoes, bananas, apples, and oranges. Perfect for a family.',
    category: 'fruits',
    quantity: '4 kg',
    servings: 8,
    expiryDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
    location: 'Whitefield, Bangalore',
    imageUrl: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&q=80',
    tags: ['fruits', 'fresh', 'healthy'],
    isVeg: true,
    status: 'available',
    createdBy: donorIds[1],
  },
  {
    name: 'Restaurant Leftover Meals',
    description: 'Our restaurant prepared extra portions of paneer butter masala, dal tadka, and rice.',
    category: 'cooked',
    quantity: '8 meals',
    servings: 8,
    expiryDate: new Date(Date.now() + 6 * 60 * 60 * 1000),
    location: 'MG Road, Bangalore',
    imageUrl: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80',
    tags: ['restaurant', 'cooked', 'Indian'],
    isVeg: true,
    status: 'available',
    createdBy: donorIds[0],
  },
  {
    name: 'Dairy Products Bundle',
    description: 'Surplus dairy: 2L fresh milk, 500g paneer, and 1kg curd from our farm.',
    category: 'dairy',
    quantity: 'Bundle',
    servings: 6,
    expiryDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    location: 'Yelahanka, Bangalore',
    imageUrl: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&q=80',
    tags: ['dairy', 'farm-fresh', 'organic'],
    isVeg: true,
    status: 'available',
    createdBy: donorIds[1],
  },
  {
    name: 'Canned Goods & Non-perishables',
    description: 'Cleaning out my pantry: canned beans, chickpeas, tomatoes, pasta, rice packets.',
    category: 'grocery',
    quantity: '20 items',
    servings: 20,
    expiryDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    location: 'BTM Layout, Bangalore',
    imageUrl: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=400&q=80',
    tags: ['canned', 'pantry', 'non-perishable'],
    isVeg: true,
    status: 'available',
    createdBy: donorIds[0],
  },
  {
    name: 'Party Food Surplus',
    description: 'Birthday party leftovers: sandwiches, pasta salad, mini quiches, and assorted snacks.',
    category: 'snacks',
    quantity: 'Large quantity',
    servings: 15,
    expiryDate: new Date(Date.now() + 10 * 60 * 60 * 1000),
    location: 'JP Nagar, Bangalore',
    imageUrl: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=400&q=80',
    tags: ['party', 'snacks', 'assorted'],
    isVeg: false,
    status: 'available',
    createdBy: donorIds[1],
  },
];

const seed = async () => {
  try {
    await connectDB();
    console.log('\n🌱  Starting database seed...\n');

    // ── Wipe existing data ──────────────────────────────────────────────────
    await User.deleteMany({});
    await Food.deleteMany({});
    await Request.deleteMany({});
    console.log('🗑️   Cleared existing data');

    // ── Create users (passwords auto-hashed by pre-save hook) ───────────────
    const createdUsers = await User.insertMany(
      SAMPLE_USERS.map((u) => ({ ...u }))
    );

    // But insertMany bypasses pre-save — manually hash passwords
    await User.deleteMany({});
    const users = [];
    for (const userData of SAMPLE_USERS) {
      const user = new User(userData);
      await user.save(); // triggers bcrypt pre-save hook
      users.push(user);
    }
    console.log(`👤  Created ${users.length} users`);

    // ── Create food items ───────────────────────────────────────────────────
    const donorIds = [users[0]._id, users[1]._id];
    const foodItems = getSampleFood(donorIds);
    const foods = await Food.insertMany(foodItems);
    console.log(`🍱  Created ${foods.length} food listings`);

    // ── Create a sample request ─────────────────────────────────────────────
    await Request.create({
      userId: users[2]._id,
      foodId: foods[0]._id,
      requesterName: users[2].name,
      location: users[2].location,
      message: 'Would love to take these vegetables. I have 3 kids at home!',
      urgency: 'medium',
      type: 'food_specific',
    });
    console.log('📦  Created 1 sample request');

    console.log('\n✅  Seed complete!\n');
    console.log('Demo accounts:');
    console.log('  📧 alex@foodshare.com   🔑 password123  (donor)');
    console.log('  📧 priya@foodshare.com  🔑 password123  (donor)');
    console.log('  📧 rahul@foodshare.com  🔑 password123  (user)');
    console.log('  📧 admin@foodshare.com  🔑 admin123     (admin)\n');

    process.exit(0);
  } catch (error) {
    console.error('❌  Seed failed:', error.message);
    process.exit(1);
  }
};

seed();
