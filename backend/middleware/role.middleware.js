import ApiError from '../utils/ApiError.js';

/**
 * RBAC authorization middleware to restrict access to specific roles.
 * 
 * @param {...string} allowedRoles - List of permitted roles.
 */
export const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    // Check if user is authenticated and has an authorized role
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return next(
        new ApiError(403, `Forbidden: User role '${req.user?.role || 'Guest'}' is not authorized to access this route`)
      );
    }
    next();
  };
};
