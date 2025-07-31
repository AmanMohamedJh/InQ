const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect middleware: verifies JWT and attaches user to req.user
exports.protect = async (req, res, next) => {
  try {
    let token;
    // 1. Get token from cookie or Authorization header
    if (req.cookies && req.cookies.accessToken) {
      token = req.cookies.accessToken;
    } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
      return res.status(401).json({ error: 'Not authorized, token missing' });
    }
    // 2. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // 3. Attach user to req
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Not authorized, token invalid' });
  }
};
