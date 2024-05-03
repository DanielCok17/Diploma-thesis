const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['admin', 'dispatcher', 'superadmin', 'operator', 'rescuer', 'policeman', 'firefighter', 'analyst', 'user'], default: 'user' },
  createdAt: { type: Date, default: Date.now },
  lastLogin: { type: Date },
  isActive: { type: Boolean, default: true }, // To manage whether the user account is active
  personalInfo: {
    firstName: { type: String },
    lastName: { type: String},
    phoneNumber: { type: String }
  },
  settings: {
    language: { type: String, default: 'English' },
    notifications: { type: Boolean, default: true }
  }
});

// Password hash middleware.
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to check password validity
userSchema.methods.isValidPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
