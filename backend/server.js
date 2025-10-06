// 1. Configure environment variables
require('dotenv').config();

// 2. Import Dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import all route files
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const messageRoutes = require('./routes/messages');

// 3. Initialize the Express application
const app = express();

// --- FINAL CORS CONFIGURATION FOR DEPLOYMENT ---
// This tells our backend to trust requests specifically from our live Vercel frontend.
// IMPORTANT: You may need to update this URL if you get a new one from Vercel.
const corsOptions = {
  origin: 'https://portfolio-fullstack-k8125btx3-sonu-saws-projects.vercel.app'
};
app.use(cors(corsOptions));


// 4. Add middleware
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
app.use('/api/messages', messageRoutes);

// --- Example base route ---
app.get('/', (req, res) => {
  res.send('Hello from the secure backend!');
});

// 8. Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

