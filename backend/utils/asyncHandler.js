/**
 * Wrapper for async route controllers to catch errors and forward them to the next middleware.
 * Avoids verbose try-catch repeating blocks in controller implementations.
 * 
 * @param {Function} requestHandler - The controller function to execute.
 * @returns {Function} Express middleware function.
 */
const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};

export default asyncHandler;
