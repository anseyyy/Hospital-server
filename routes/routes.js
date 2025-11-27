const express = require ('express')
const router = express.Router()
const { createAppointment , getAppointments } = require('../controller/appointmentController')
const { createContact, getContacts } = require("../controller/contactController");
const { createFeedback, getFeedbacks } = require("../controller/feedbackController");
const {
  loginAdmin,
  logoutAdmin,
  verifyToken,
  getAdminProfile,
  createInitialAdmin
} = require('../controller/adminController');


router.post("/appointments", createAppointment);
router.get("/appointments", getAppointments);


router.post("/contacts", createContact);
router.get("/contacts", getContacts);



router.post("/feedback", createFeedback);
router.get("/feedback", getFeedbacks);





module.exports = router


// Admin authentication routes
router.post("/admin/login", loginAdmin);
router.post("/admin/logout", logoutAdmin);
router.get("/admin/profile", verifyToken, getAdminProfile);

// Create initial admin (setup route)
router.post("/admin/create", createInitialAdmin);