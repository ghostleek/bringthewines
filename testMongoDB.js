require('dotenv').config();
const mongoose = require('mongoose');

// Connection string (Replace it with your MongoDB URI)

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected successfully.');
  })
  .catch((error) => {
    console.log('Error while attempting to connect to MongoDB', error);
  });
