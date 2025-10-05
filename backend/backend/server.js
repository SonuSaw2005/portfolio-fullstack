// 1. Configure environment variables
require('dotenv').config();

// 2. Import Dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// --- UPDATED: Import ALL route files ---
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const messageRoutes = require('./routes/messages'); // <-- ADD THIS LINE

// 3. Initialize the Express application
const app = express();

// 4. Add middleware
app.use(cors());
app.use(express.json());

// 5. Define the port
const PORT = process.env.PORT || 3000;

// 6. Connect to MongoDB
const dbURI = `mongodb+srv://portfolioAppUser:${process.env.DB_PASSWORD}@cluster0.tl28trj.mongodb.net/Cluster0?retryWrites=true&w=majority`;

mongoose.connect(dbURI)
  .then(() => console.log('MongoDB connected successfully.'))
  .catch(err => {
    console.log('MongoDB connection error. Please ensure your DB_PASSWORD is correct.');
    console.error(err);
  });

// 7. Define API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/messages', messageRoutes); // <-- AND ADD THIS LINE


// --- Example base route ---
app.get('/', (req, res) => {
  res.send('Hello from the secure backend!');
});

// 8. Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

