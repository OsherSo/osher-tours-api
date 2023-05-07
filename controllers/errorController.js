const AppError = require('../utils/appError');

const createAppError = (message, statusCode) =>
  new AppError(message, statusCode);

const handleCastErrorDB = (err) => {
  const { path, value } = err;
  const message = `Invalid ${path}: ${value}`;
  return createAppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const { keyValue } = err;
  const value = Object.values(keyValue)[0];
  const message = `Duplicate field value: ${value}. Use another value.`;
  return createAppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return createAppError(message, 400);
};

const handleJWTError = () =>
  createAppError('Invalid token. Please log in again.', 401);

const handleJWTExpiredError = () =>
  createAppError('Expired token. Please log in again.', 401);

const sendError = (req, res, statusCode, data) => {
  if (req.originalUrl.startsWith('/api')) {
    res.status(statusCode).json(data);
  } else {
    res.status(statusCode).render('error', {
      title: 'Something went wrong!',
      msg: data.message,
    });
  }
};

const sendErrorDev = (req, res, err) => {
  sendError(req, res, err.statusCode, {
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (req, res, err) => {
  if (err.isOperational) {
    sendError(req, res, err.statusCode, {
      status: err.status,
      message: err.message,
    });
  } else {
    sendError(req, res, 500, {
      status: 'error',
      message: 'Something went very wrong!',
    });
  }
};

const handleErrors = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  let error = { ...err }; // create a copy of the error object

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(req, res, error);
  } else if (process.env.NODE_ENV === 'production') {
    if (error.name === 'CastError') error = handleCastErrorDB(error);
    else if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    else if (error.name === 'ValidationError')
      error = handleValidationErrorDB(error);
    else if (error.name === 'JsonWebTokenError') error = handleJWTError();
    else if (error.name === 'TokenExpiredError')
      error = handleJWTExpiredError();

    sendErrorProd(req, res, error);
  }
};

module.exports = handleErrors;
