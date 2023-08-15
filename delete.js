const mongoose = require('mongoose');
const Wine = require('models/wine.js'); // Path to the Wine model

// Connect to MongoDB (replace the URL with your actual connection string)
mongoose.connect('mongodb+srv://bringthewines_prod:60SYJAzwtfhs5EwO@cluster0.dzdvfvo.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to database');
  // Specify the date and time after which records should be deleted
  const dateToDeleteAfter = new Date('2023-08-13T20:30:00');

  // Remove all records from the Wine collection created after the specified date and time
  Wine.deleteMany({ createdAt: { $gt: dateToDeleteAfter } }, (err) => {
    if (err) {
      console.error('Error deleting records:', err);
    } else {
      console.log('Records deleted successfully');
    }
    mongoose.connection.close(); // Close the connection
  });
})
.catch((err) => {
  console.error('Error connecting to the database:', err);
});