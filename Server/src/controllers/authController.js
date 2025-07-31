const User = require("../models/User");
const sendToken = require("../utils/sendToken");
const validator = require("validator");

// Register Controller
exports.register = async (req, res) => {
  try {
    const { name, email, telephone, password, role } = req.body;
    // Validate input
    if (!name || !email || !telephone || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Invalid email" });
    }
    if (!validator.isMobilePhone(telephone, undefined, { strictMode: false })) {
      return res.status(400).json({ error: "Invalid telephone number" });
    }
    if (password.length < 8) {
      return res.status(400).json({ error: "Password must be at least 8 characters" });
    }
    // Check if user exists
    const existingUser = await User.findOne({ $or: [{ email }, { telephone }] });
    if (existingUser) {
      return res.status(409).json({ error: "Email or telephone already in use" });
    }
    // Create user
    const user = await User.create({ name, email, telephone, password, role });
    sendToken(user, 201, res);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Login Controller
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }
    // Find user and select password
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    sendToken(user, 200, res);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Logout Controller
exports.logout = (req, res) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Lax"
  });
  res.status(200).json({ success: true, message: "Logged out" });
};
