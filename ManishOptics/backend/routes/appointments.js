const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

// @route   GET /api/appointments
// @desc    Get all appointments (sorted by date ascending)
// @access  Public (Can be protected if admin authentication is added later)
router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ date: 1, timeSlot: 1 });
    res.json(appointments);
  } catch (err) {
    console.error('Error fetching appointments:', err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/appointments
// @desc    Create a new appointment
// @access  Public
router.post('/', async (req, res) => {
  const { name, email, phone, date, timeSlot, serviceType, notes } = req.body;

  try {
    // Check if slot already taken on this date
    // Note: Simple check for exact slot. In production, could be more advanced.
    const existingAppointment = await Appointment.findOne({
      date: new Date(date),
      timeSlot,
      status: { $ne: 'cancelled' },
    });

    if (existingAppointment) {
      return res.status(400).json({
        errors: [{ msg: 'This time slot is already booked for this date.' }],
      });
    }

    const newAppointment = new Appointment({
      name,
      email,
      phone,
      date,
      timeSlot,
      serviceType,
      notes,
    });

    const appointment = await newAppointment.save();
    res.json(appointment);
  } catch (err) {
    console.error('Error creating appointment:', err.message);
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({ errors: messages.map(msg => ({ msg })) });
    }
    res.status(500).send('Server Error');
  }
});

// @route   PUT /api/appointments/:id
// @desc    Update appointment status
// @access  Public
router.put('/:id', async (req, res) => {
  const { status } = req.body;

  if (!status || !['pending', 'confirmed', 'cancelled'].includes(status)) {
    return res.status(400).json({ msg: 'Please provide a valid status update.' });
  }

  try {
    let appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ msg: 'Appointment not found' });
    }

    appointment.status = status;
    await appointment.save();

    res.json(appointment);
  } catch (err) {
    console.error('Error updating appointment:', err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Appointment not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   DELETE /api/appointments/:id
// @desc    Delete an appointment
// @access  Public
router.delete('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ msg: 'Appointment not found' });
    }

    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Appointment removed' });
  } catch (err) {
    console.error('Error deleting appointment:', err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Appointment not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
