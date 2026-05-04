const mongoose = require('mongoose');

/**
 * Connect to MongoDB using the URI from environment variables.
 * Exits the process on failure to prevent silent crashes.
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // These options are defaults in Mongoose 8, listed for clarity
      serverSelectionTimeoutMS: 5000,
    });

    console.log(`✅  MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌  MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
