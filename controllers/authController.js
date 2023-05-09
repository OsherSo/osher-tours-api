const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const sendEmail = require('../utils/email');

const signToken = (id) => {
  const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;
  const payload = { id };
  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
  return token;
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') {
    cookieOptions.secure = true;
  }

  res.cookie('jwt', token, cookieOptions);
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: user,
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const { name, email, password, passwordConfirm } = req.body;
  const newUser = await User.create({ name, email, password, passwordConfirm });
  createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide email and password.', 400));
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  createSendToken(user, 200, res);
});

exports.logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({ status: 'success' });
};

exports.protect = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    );
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id);

  if (!user) {
    return next(
      new AppError('The user belonging to this token does not exist.', 401)
    );
  }

  if (user.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password. Please log in again.', 401)
    );
  }

  req.user = user;
  res.locals.user = user;
  next();
});

// Middleware to check if the user is logged in and set the user data on res.locals
exports.isLoggedIn = catchAsync(async (req, res, next) => {
  if (req.cookies.jwt) {
    // Check if the user is logged out
    if (req.cookies.jwt === 'loggedout') return next();

    // Verify the JWT token and get the user data
    const decoded = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRET
    );
    const user = await User.findById(decoded.id);

    // Check if the user exists and hasn't changed their password since the token was issued
    if (!user || user.changedPasswordAfter(decoded.iat)) {
      return next();
    }

    // Set the user data on res.locals and continue to the next middleware
    res.locals.user = user;
    return next();
  }

  // If there is no JWT token, continue to the next middleware
  next();
});

// Middleware to restrict access based on user roles
exports.restrictTo =
  (...roles) =>
  (req, res, next) => {
    // Check if the user's role is included in the allowed roles
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }

    // If the user has permission, continue to the next middleware
    next();
  };

// Controller function to handle forgot password requests
exports.forgotPassword = catchAsync(async (req, res, next) => {
  // Find the user with the requested email address
  const user = await User.findOne({ email: req.body.email });

  // If there is no user with the requested email, return an error
  if (!user) {
    return next(new AppError('There is no user with email address', 404));
  }

  // Generate a password reset token and save it to the user document
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // Generate a URL where the user can reset their password
  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/users/resetPassword/${resetToken}`;

  // Generate an email message with instructions for resetting the password
  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\n
  If you didn't forget your password, please ignore this email!`;

  // Send the email to the user's email address
  try {
    await sendEmail({
      email: user.email,
      subject: 'Your password reset token (valid for 10 min)',
      message,
    });

    // Send a response indicating that the password reset token has been sent to the user's email
    res.status(200).json({
      status: 'success',
      message: 'Token sent to email.',
    });
  } catch (err) {
    // If there was an error sending the email, clear the password reset token and return an error
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError(
        'There was an error sending the email. Try again later.',
        500
      )
    );
  }
});

// Controller function to handle password reset requests
exports.resetPassword = catchAsync(async (req, res, next) => {
  // Hash the reset token and find the user with the matching token and valid expiration date
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // If there is no user with the requested reset token, return an error
  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }

  // Update the user's password and clear the password reset token and expiration date
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // Send a response with a new JWT token
  createSendToken(user, 200, res);
});

// Controller function to handle password update requests
exports.updatePassword = catchAsync(async (req, res, next) => {
  // Find the user by ID and select the password field
  const user = await User.findById(req.user._id).select('+password');

  // Check if the current password is correct
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError('Your current password is wrong.', 401));
  }

  // Update the user's password and clear the password reset token and expiration date
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  // Send a response with a new JWT token
  createSendToken(user, 200, res);
});
