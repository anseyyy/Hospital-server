const Appointment = require("../models/Appointment");

exports.createAppointment = async (req, res) => {
  console.log("inside createAppointment");

  try {
  
    const { doctorName, patientName, email, phoneNumber, date, timeSlot } = req.body;

 
    if (!doctorName || !patientName || !email || !phoneNumber || !date || !timeSlot) {
      return res.status(400).json({ message: "All fields are required" });
    }

  
    const emailRegex = /.+\@.+\..+/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    if (!phoneRegex.test(phoneNumber)) {
      return res.status(400).json({ message: "Phone number must be 10 digits" });
    }

    const normalizedDate = new Date(date);

    // Calculate expiration time combining date and timeSlot
    // Format is "09:00 AM", "02:00 PM", etc.
    let expireDate = new Date(normalizedDate);
    const [time, modifier] = timeSlot.split(" ");
    let [hours, minutes] = time.split(":");
    
    if (hours === "12") {
      hours = "00";
    }
    
    if (modifier === "PM") {
      hours = parseInt(hours, 10) + 12;
    }
    
    // Set hours and minutes to the appointment date
    expireDate.setHours(hours, minutes, 0, 0);
    
    // Add 1 hour buffer after the appointment starts before deleting
    expireDate.setHours(expireDate.getHours() + 1);

    const appointment = new Appointment({
      doctorName,   
      patientName,
      email,
      phoneNumber,
      date: normalizedDate,
      timeSlot,
      expireAt: expireDate,
    });

    await appointment.save();
    res.status(201).json({ message: "Appointment booked successfully", appointment });
    console.log("Appointment booked successfully");
  } catch (error) {
    console.error("Error details:", error);
    res.status(500).json({ message: "Error booking appointment", error: error.message });
  }
};

// Get all appointments
exports.getAppointments = async (req, res) => {
  console.log("inside getAppointments");
  try {
    const appointments = await Appointment.find().sort({ date: 1 });
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching appointments",
      error: error.message,
    });
  }
};




