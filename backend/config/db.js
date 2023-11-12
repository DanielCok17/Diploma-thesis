const mongoose = require('mongoose');
require('dotenv').config();

if (process.env.NODE_ENV === 'prod') {
  console.log('Running in production mode');
} else {
  console.log('Running in development mode');
}

// Use different URLs for production and development environments
const url = process.env.NODE_ENV === 'prod' ? process.env.MONGODB_PROD_URL : process.env.MONGODB_DEV_URL;

async function connectToDatabase() {
  try {
    console.log('Connecting to MongoDB database...' + url);
    await mongoose.connect(url);
    console.log('Connected to MongoDB database!');
  } catch (error) {
    console.error('Connection error:', error.message);
  }
}

// Call the connectToDatabase function to establish the connection
connectToDatabase();

// Export the mongoose object
module.exports = mongoose;
