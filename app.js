// Import necessary modules
const path = require('path');
const express = require('express');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const compression = require('compression');

// Import custom modules
const AppError = require('./utils/appError');
const handleErrors = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const viewRouter = require('./routes/viewRoutes');

// Create express app
const app = express();

// Set up view engine and views directory
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Set up static files directory
app.use(express.static(path.join(__dirname, 'public')));

// Set up rate limiting for API endpoints
const limiter = rateLimit({
  max: 500,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour.',
});
app.use('/api', limiter);

// Set up middleware for parsing JSON, cookies, sanitizing data, and preventing XSS and HPP attacks
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());
app.use(mongoSanitize());
app.use(xss());
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  })
);

// Set up middleware for compressing response bodies
app.use(compression());

// Set up routes for views and API endpoints
app.use('/', viewRouter);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);

// Handle undefined routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Handle errors
app.use(handleErrors);

module.exports = app;
