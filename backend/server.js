import dotenv from 'dotenv';
import app from './app.js';
import connectDB from './config/db.js';
import logger from './utils/logger.js';

// Load environment variables
dotenv.config();

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  logger.error('UNCAUGHT EXCEPTION! Shutting down...');
  logger.error(`${err.name}: ${err.message}\n${err.stack}`);
  process.exit(1);
});

// Connect to MongoDB Database
connectDB();

const PORT = process.env.PORT || 5000;

// Start Express Server
const server = app.listen(PORT, () => {
  logger.info(`Server is running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  logger.error('UNHANDLED REJECTION! Shutting down...');
  logger.error(`${err.name}: ${err.message}\n${err.stack}`);
  server.close(() => {
    process.exit(1);
  });
});
