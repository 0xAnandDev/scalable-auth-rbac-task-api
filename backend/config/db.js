import mongoose from 'mongoose';
import logger from '../utils/logger.js';

/**
 * Establish connection to MongoDB Database.
 */
const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error('MONGODB_URI environmental variable is not set inside the configuration.');
    }

    const conn = await mongoose.connect(mongoUri);
    logger.info(`MongoDB Connected successfully: ${conn.connection.host}`);
  } catch (error) {
    logger.error(`Database connection failure: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
