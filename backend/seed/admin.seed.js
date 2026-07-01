import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import { ROLES } from '../utils/constants.js';
import logger from '../utils/logger.js';

// Load environment variables
dotenv.config();

/**
 * Seeds a default admin account into the database.
 */
const seedAdmin = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error('MONGODB_URI is not defined in the environment config.');
    }

    await mongoose.connect(mongoUri);
    logger.info('Database connected for admin seeding...');

    // Check if admin already exists
    const adminEmail = 'admin@taskmanager.com';
    const adminExists = await User.findOne({ email: adminEmail });

    if (adminExists) {
      logger.info(`Admin user with email ${adminEmail} already exists. Seeding skipped.`);
    } else {
      // Create admin user
      await User.create({
        name: 'System Admin',
        email: adminEmail,
        password: 'AdminPassword123', // Will be hashed automatically by userSchema pre-save hook
        role: ROLES.ADMIN,
      });
      logger.info(`Admin account (${adminEmail}) seeded successfully with password: AdminPassword123`);
    }
  } catch (error) {
    logger.error(`Error seeding admin database: ${error.message}`);
  } finally {
    await mongoose.disconnect();
    logger.info('Database connection closed.');
    process.exit(0);
  }
};

seedAdmin();
