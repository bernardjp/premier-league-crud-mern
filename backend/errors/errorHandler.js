import { StatusCodes } from 'http-status-codes';
import ApiError from './ApiError.js';

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  console.log('errorHandler:', err);

  // Custom default Error.
  const customError = {
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    msg: 'Something went wrong, try again later.'
  };

  // Custom API Error.
  if (err instanceof ApiError) {
    customError.statusCode = err.code;
    customError.msg = err.message;
  }

  // MongoDB and Mongoose error-handling
  // Duplication Error.
  if (err.codeName === 'DuplicateKey') {
    customError.statusCode = StatusCodes.BAD_REQUEST;
    customError.msg = `The value entered for '${Object.keys(err.keyValue)}' already exist. Please enter another value.`;
  }
  // Validation Error.
  if (err.name === 'ValidationError') {
    customError.statusCode = StatusCodes.BAD_REQUEST;
    customError.msg = Object.values(err.errors).map(item => item.message).join(' ');
  }
  // Cast Error.
  // (Currently not in use since the Schema doesn't use ObjectId to create the resource id)
  if (err.name === 'CastError') {
    customError.statusCode = StatusCodes.NOT_FOUND;
    customError.msg = `Invalid value. No resource found with ${err.path}: ${err.value}.`;
  }

  return res.status(customError.statusCode).json({ message: customError.msg });
};

export default errorHandler;
