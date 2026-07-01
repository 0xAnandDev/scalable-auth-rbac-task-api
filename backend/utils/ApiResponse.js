/**
 * Standard API response envelope formatting class.
 */
class ApiResponse {
  constructor(statusCode, data, message = 'Success') {
    this.statusCode = statusCode;
    this.success = statusCode < 400;
    this.message = message;
    this.data = data;
  }
}

export default ApiResponse;
// For standard JSON conversion, express automatically serializes the properties: success, message, data.
// In the controller, we do: res.status(200).json(new ApiResponse(200, { user }, "User logged in successfully"))
