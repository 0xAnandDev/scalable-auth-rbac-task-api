import jwt from 'jsonwebtoken';
import ApiError from '../utils/ApiError.js';
import asyncHandler from '../utils/asyncHandler.js';
import User from '../models/User.js';

/**
 * Authentication middleware that verifies JWT and attaches user to the request object.
 */
export const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Retrieve token from Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    throw new ApiError(401, 'Not authorized, token is missing');
  }

  try {
    // Verify token payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');

    // Retrieve user associated with the token (excluding password field)
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      throw new ApiError(401, 'Not authorized, user not found');
    }

    // Attach authenticated user to the request context
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, 'Not authorized, token verification failed');
  }
});
