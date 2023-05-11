const path = require('path');
const http = require('http');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = require('./app');

dotenv.config({ path: path.join(__dirname, 'config.env') });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose.connect(DB).then(() => {
  console.log('Database connection successful');
});

const port = process.env.PORT || 8000;
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
