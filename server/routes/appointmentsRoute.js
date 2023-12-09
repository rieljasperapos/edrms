const express = require("express");
const router = express.Router();
const appointmentsController = require("../controllers/appointmentsController");
const validatePatientExist = require("../validations/patientExistingValidator");

router.post("/add", appointmentsController.addAppointment);
router.get("/", appointmentsController.getAppointments);
router.put("/edit/:appointmentId", appointmentsController.editAppointment);
router.get("/:appointmentId", appointmentsController.getAppointmentsById);
router.post("/patient", validatePatientExist.checkPatientExist);
router.post(
  "/totalCancelled",
  appointmentsController.getTotalAppointmentsCancelled,
);
router.post(
  "/totalConfirmed",
  appointmentsController.getTotalAppointmentsConfirmed,
);

module.exports = router;
