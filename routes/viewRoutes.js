// Import the required modules
const express = require('express');
const authController = require('../controllers/authController');
const viewController = require('../controllers/viewController');

// Create a new router instance
const router = express.Router();

// Define the routes and middleware
router.get('/', authController.isLoggedIn, viewController.getOverview);
router.get('/tour/:slug', authController.isLoggedIn, viewController.getTour);
router.get('/login', authController.isLoggedIn, viewController.getLoginForm);
router.get('/signup', viewController.getRegisterForm);
router.get('/me', authController.protect, viewController.getAccount);

// Export the router for use in other modules
module.exports = router;
