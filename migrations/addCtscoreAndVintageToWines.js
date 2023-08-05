const mongoose = require('mongoose');
const Wine = require('models/wine.js');
import dotenv from 'dotenv';

dotenv.config();


async function migrate() {
    const wines = await Wine.find();
    wines.forEach(async (wine) => {
        wine.vintage = 1990; // or set to some default value
        wine.ct_score = 90.2; // or set to some default value
        await wine.save();
    });
}

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    return migrate();
  })
  .then(() => {
    console.log('Migration complete.');
    process.exit();
  })
  .catch(err => {
    console.error('Migration failed:', err);
    process.exit(1);
  });