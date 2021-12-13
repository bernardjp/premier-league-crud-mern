import { StatusCodes } from 'http-status-codes';

class ApiError {
  constructor(code, message) {
    this.code = code;
    this.message = message;
  }

  static badRequest(message) {
    return new ApiError(StatusCodes.BAD_REQUEST, message);
  }

  static notFound(message) {
    return new ApiError(StatusCodes.NOT_FOUND, message);
  }

  static internalError(message) {
    return new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, message);
  }
}

export default ApiError;
