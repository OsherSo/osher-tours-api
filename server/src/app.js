const path = require('path');
const express = require('express');
const cors = require('cors');

// const rateLimit = require('express-rate-limit');
// const mongoSanitize = require('express-mongo-sanitize');
// const xss = require('xss-clean');
// const hpp = require('hpp');
// const cookieParser = require('cookie-parser');
// const compression = require('compression');

// const handleErrors = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');

const app = express();

// app.set('view engine', 'pug');
// app.set('views', path.join(__dirname, 'views'));

app.use(cors());

app.use(express.json({ limit: '10kb' }));

app.use(express.static(path.join(__dirname, '..', 'public')));

// const limiter = rateLimit({
//   max: 500,
//   windowMs: 60 * 60 * 1000,
//   message: 'Too many requests from this IP, please try again in an hour.',
// });
// app.use('/api', limiter);

// app.use(cookieParser());

// app.use(mongoSanitize());

// app.use(xss());

// app.use(
//   hpp({
//     whitelist: [
//       'duration',
//       'ratingsQuantity',
//       'ratingsAverage',
//       'maxGroupSize',
//       'difficulty',
//       'price',
//     ],
//   })
// );

// app.use(compression());

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);

// app.use(handleErrors);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

module.exports = app;
