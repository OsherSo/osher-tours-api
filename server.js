const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from config file
dotenv.config({ path: './config.env' });

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught exception. Shutting down...');
  console.error(err);
  process.exit(1);
});

// Connect to database
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose.connect(DB).then(() => {
  console.log('Database connection successful');
});

// Start server
const app = require('./app');
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

// Handle unhandled rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled rejection. Shutting down...');
  console.error(err);
  server.close(() => {
    process.exit(1);
  });
});
