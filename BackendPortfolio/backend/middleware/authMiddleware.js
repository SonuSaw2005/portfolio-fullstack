const jwt = require('jsonwebtoken');

// This is our "bouncer" function.
// It will run before any protected route logic.
const authMiddleware = (req, res, next) => {
  // 1. Get the token from the request header
  const token = req.header('x-auth-token');

  // 2. Check if there is no token
  if (!token) {
    // If no token, access is denied.
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // 3. If there IS a token, verify it
  try {
    // We use the same JWT_SECRET from our .env file to check if the token is valid
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // If the token is valid, the 'decoded' payload will contain the user's ID.
    // We attach this user information to the request object.
    req.user = decoded.user;
    
    // The user is authenticated! Call 'next()' to proceed to the actual route logic.
    next();
  } catch (err) {
    // If the token is not valid (e.g., it's expired or fake), access is denied.
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = authMiddleware;

