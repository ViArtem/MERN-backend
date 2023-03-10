class ApiError extends Error {
  status;
  errors;
  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.message = message;
  }
  // error during authorization
  static UnauthorizedError(message) {
    return new ApiError(401, message);
  }
  // request error
  static BadRequest(message, errors) {
    return new ApiError(400, message, (errors = []));
  }

  static RefreshError(message, errors) {
    return new ApiError(403, message, (errors = []));
  }
}

export default ApiError;
