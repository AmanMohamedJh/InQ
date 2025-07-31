const jwt = require("jsonwebtoken");

const sendToken = (user, statusCode, res) => {
  // 1. Create JWT token
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "15m",
    }
  );

  // 2. Configure secure cookie options
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Lax", // Use 'Strict' or 'None' if needed
    maxAge: 15 * 60 * 1000, // 15 minutes
  };

  // 3. Set the cookie
  res.cookie("accessToken", token, cookieOptions);

  // 4. Remove password from response
  user.password = undefined;

  // 5. Send JSON response
  res.status(statusCode).json({
    success: true,
    token,
    user,
  });
};

module.exports = sendToken;
