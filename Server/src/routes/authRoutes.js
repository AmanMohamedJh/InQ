const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');
const { authorizeRoles } = require('../middlewares/roleMiddleware');

// Auth routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', protect, authController.logout);

// Example protected route
router.get('/profile', protect, (req, res) => {
  res.json({ user: req.user });
});

// Example role-based route
router.post('/shop/add', protect, authorizeRoles('owner'), (req, res) => {
  res.json({ message: 'Shop created (owner only)' });
});

module.exports = router;
