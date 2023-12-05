const express = require('express');
const router = express.Router();
const appointmentsController = require('../controllers/appointmentsController');

router.post('/add', appointmentsController.addAppointment);
router.get('/', appointmentsController.getAppointments);

module.exports = router;