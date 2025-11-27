const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const adminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      default: "admin",
      enum: ["admin", "superadmin"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
// Temporarily commented out due to Mongoose compatibility issues
/*
adminSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    console.error('Error hashing password:', error);
    next(error);
  }
});
*/

// Compare password method
adminSchema.methods.comparePassword = async function (candidatePassword) {
  // Check if password is already hashed (starts with $2b$ or $2a$)
  const isHashed =
    this.password.startsWith("$2b") || this.password.startsWith("$2a");

  if (isHashed) {
    // Password is hashed, use bcrypt compare
    return bcrypt.compare(candidatePassword, this.password);
  } else {
    // Password is plain text, simple string comparison
    return candidatePassword === this.password;
  }
};

// Remove password from JSON output
adminSchema.methods.toJSON = function () {
  const adminObject = this.toObject();
  delete adminObject.password;
  return adminObject;
};

module.exports = mongoose.model("Admin", adminSchema);
