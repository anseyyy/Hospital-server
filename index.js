const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
require("./dbConnect/dbConnection"); 
const router = require("./routes/routes"); 

const backend = express();
backend.use(cors());
backend.use(express.json());


backend.use("/api", router);

const PORT = process.env.PORT || 5000; 
backend.listen(PORT, () => {
  console.log(` Server is running on port ${PORT}`);
});

backend.get("/pingdb", async (req, res) => {
  try {
    await mongoose.connection.db.admin().ping();
    res.send("✅ MongoDB reachable");
  } catch (err) {
    res.status(500).send("❌ MongoDB error: " + err.message);
  }
});
