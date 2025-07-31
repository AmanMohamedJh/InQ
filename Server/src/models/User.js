const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    validate: [validator.isEmail, 'Invalid email address']
  },
  telephone: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        // Accepts international and local formats
        return validator.isMobilePhone(v, undefined, { strictMode: false });
      },
      message: 'Invalid telephone number'
    }
  },
  password: { type: String, required: true, minlength: 8, select: false },
  role: { type: String, enum: ['customer', 'owner'], default: 'customer' }
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Check password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
