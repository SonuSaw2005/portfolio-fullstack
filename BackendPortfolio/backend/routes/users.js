const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Correctly imports the User model

// @route   GET /api/users
// @desc    Get all users (for testing, passwords will be excluded)
// @access  Public (we will protect this endpoint later)
router.get('/', async (req, res) => {
  try {
    // .find() gets all users from the 'users' collection
    // .select('-password') excludes the password field from the result for security
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

