import ApiError from '../utils/ApiError.js';
import logger from '../utils/logger.js';

/**
 * Express error handling middleware to catch and format all application exceptions.
 */
export const errorMiddleware = (err, req, res, next) => {
  let error = err;

  // Convert non-ApiError errors to ApiError
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || (error.name === 'ValidationError' ? 400 : 500);
    const message = error.message || 'Internal Server Error';
    error = new ApiError(statusCode, message, err.errors || [], err.stack);
  }

  // Log error using winston logger
  logger.error(`[${req.method}] ${req.originalUrl} - ${error.statusCode} - ${error.message}`);
  if (process.env.NODE_ENV === 'development' && error.stack) {
    logger.error(error.stack);
  }

  // Final structured response payload
  const response = {
    success: false,
    message: error.message,
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
    ...(error.errors && error.errors.length > 0 && { errors: error.errors }),
  };

  res.status(error.statusCode).json(response);
};
