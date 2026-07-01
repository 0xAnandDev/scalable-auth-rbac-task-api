import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import ApiError from '../utils/ApiError.js';

/**
 * Service to generate JWT token.
 * 
 * @param {string} id - User identification database key.
 * @returns {string} Signed JWT.
 */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_secret', {
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  });
};

/**
 * Service to register a new user.
 */
const registerUser = async ({ name, email, password, role }) => {
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new ApiError(400, 'User already exists with this email address');
  }

  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  const token = generateToken(user._id);

  // Return clean user info and credentials token
  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  };
};

/**
 * Service to authenticate user login credentials.
 */
const loginUser = async ({ email, password }) => {
  // Explicitly select password since schema disables it by default
  const user = await User.findOne({ email }).select('+password');
  
  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const token = generateToken(user._id);

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  };
};

export default {
  registerUser,
  loginUser,
  generateToken,
};
