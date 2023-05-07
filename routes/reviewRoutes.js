// Import required modules
const express = require('express');
const authController = require('../controllers/authController');
const reviewController = require('../controllers/reviewController');

// Create a new router instance
const router = express.Router({ mergeParams: true });

// Middleware to protect routes from unauthorized access
router.use(authController.protect);

// Set up routes for the reviews resource
router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(
    authController.restrictTo('user'),
    reviewController.setTourUserIds,
    reviewController.createReview
  );

// Set up routes for individual review resources
router
  .route('/:id')
  .get(reviewController.getReview)
  .patch(
    authController.restrictTo('user', 'admin'),
    reviewController.updateReview
  )
  .delete(
    authController.restrictTo('user', 'admin'),
    reviewController.deleteReview
  );

// Export the router for use in other modules
module.exports = router;
