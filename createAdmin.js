const mongoose = require("mongoose");
const Admin = require("./models/Admin");
require("dotenv").config();

const createInitialAdmin = async () => {
  try {
    // Connect to MongoDB (same way as main server)
    await mongoose.connect(process.env.dbServer);

    console.log("Connected to MongoDB");

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({
      email: "admin@wellspringhospital.com",
    });

    if (existingAdmin) {
      console.log("Admin already exists:", existingAdmin.email);
      process.exit(0);
    }

    // Create initial admin
    const admin = new Admin({
      email: "admin@wellspringhospital.com",
      password: "admin123",
      name: "Administrator",
      role: "admin",
    });

    await admin.save();
    console.log("Initial admin created successfully!");
    console.log("Email:", admin.email);
    console.log("Password: admin123");

    process.exit(0);
  } catch (error) {
    console.error("Error creating initial admin:", error);
    process.exit(1);
  }
};

createInitialAdmin();
