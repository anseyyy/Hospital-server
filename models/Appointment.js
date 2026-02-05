const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  doctorName: {
    type: String,
    required: true,
  },
  patientName: {
    type: String,
    required: true,
  },
  email: { 
    type: String,
    required: true,
  },
  phoneNumber: { 
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  timeSlot: {
    type: String,
    required: true,
    enum: ["09:00 AM", "11:00 AM", "02:00 PM", "04:00 PM", "06:00 PM"], // restrict to valid slots
  },
  expireAt: {
    type: Date,
    default: undefined,
    index: { expires: 0 }, // Document expires exactly at this time
  },
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;