// Import the required modules
const express = require('express');
const authController = require('../../controllers/authController');
const userController = require('./userController');

// Initialize the router
const router = express.Router();

// Define the authentication routes
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

// Use the protect middleware for all the routes after this point
router.use(authController.protect);

// Define the user routes
router.patch('/updatePassword', authController.updatePassword);
router.get('/me', userController.getMe, userController.getUser);
router.patch('/updateMe', userController.updateMe);
router.delete('/deleteMe', userController.deleteMe);

// Use the restrictTo middleware to allow only admin access to the following routes
router.use(authController.restrictTo('admin'));
router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

// Export the router for use in other files
module.exports = router;
