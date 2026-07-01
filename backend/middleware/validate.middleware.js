import { validationResult } from 'express-validator';
import ApiError from '../utils/ApiError.js';

/**
 * Middleware that inspects express-validator validation results.
 * If errors are found, it halts the request and forwards a validation error to the handler.
 */
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorArray = errors.array().map((err) => ({
      field: err.path || err.param,
      message: err.msg,
    }));
    
    // Throw validation error to be intercepted by error handling middleware
    return next(new ApiError(400, 'Validation failed', errorArray));
  }
  next();
};
