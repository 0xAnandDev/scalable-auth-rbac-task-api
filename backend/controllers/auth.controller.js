import authService from '../services/auth.service.js';
import ApiResponse from '../utils/ApiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';

/**
 * Controller to handle new user registrations.
 */
export const register = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;
  
  const result = await authService.registerUser({ name, email, password, role });
  
  res.status(201).json(
    new ApiResponse(201, result, 'User registered successfully')
  );
});

/**
 * Controller to handle user logins and credentials authentication.
 */
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  
  const result = await authService.loginUser({ email, password });
  
  res.status(200).json(
    new ApiResponse(200, result, 'User logged in successfully')
  );
});

/**
 * Controller to fetch the authenticated user's profile details.
 */
export const getMe = asyncHandler(async (req, res) => {
  // req.user is set by the protect authentication middleware
  res.status(200).json(
    new ApiResponse(200, { user: req.user }, 'User profile retrieved successfully')
  );
});
