const mongoose = require('mongoose');
const jsonDb = require('../utils/jsonDb');

const AppointmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  },
  phone: {
    type: String,
    required: [true, 'Please add a phone number'],
    trim: true,
  },
  date: {
    type: Date,
    required: [true, 'Please select a date'],
  },
  timeSlot: {
    type: String,
    required: [true, 'Please select a time slot'],
    trim: true,
  },
  serviceType: {
    type: String,
    required: [true, 'Please select a service type'],
    enum: [
      'Comprehensive Eye Test',
      'Contact Lens Consultation',
      'Prescription Glasses Fitting',
      'Frame Repair & Adjustment',
    ],
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending',
  },
  notes: {
    type: String,
    trim: true,
    maxlength: [500, 'Notes cannot be more than 500 characters'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const AppointmentModel = mongoose.model('Appointment', AppointmentSchema);

const useMongo = () => mongoose.connection.readyState === 1;

function Appointment(data) {
  if (useMongo()) {
    return new AppointmentModel(data);
  }

  // Fallback JSON-based mock document instance
  const id = data._id || jsonDb.generateId();
  const doc = {
    _id: id,
    name: data.name,
    email: data.email,
    phone: data.phone,
    date: data.date,
    timeSlot: data.timeSlot,
    serviceType: data.serviceType,
    status: data.status || 'pending',
    notes: data.notes,
    createdAt: data.createdAt || new Date().toISOString()
  };

  // Attach Mongoose-like save method
  Object.defineProperty(doc, 'save', {
    enumerable: false,
    value: async function() {
      const appointments = jsonDb.getAppointments();
      // Check if we are updating an existing document or inserting a new one
      const index = appointments.findIndex(app => app._id === this._id);
      if (index !== -1) {
        appointments[index] = {
          ...appointments[index],
          name: this.name,
          email: this.email,
          phone: this.phone,
          date: this.date,
          timeSlot: this.timeSlot,
          serviceType: this.serviceType,
          status: this.status,
          notes: this.notes
        };
      } else {
        appointments.push(this);
      }
      jsonDb.saveAppointments(appointments);
      return this;
    }
  });

  return doc;
}

// Static methods mimicking Mongoose API

Appointment.find = function() {
  if (useMongo()) {
    return AppointmentModel.find();
  }

  const appointments = jsonDb.getAppointments();

  // Return thenable object that supports .sort()
  const result = {
    sort: function(sortCriteria) {
      const sorted = [...appointments].sort((a, b) => {
        // Sort by date ascending
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        if (dateA - dateB !== 0) {
          return dateA - dateB;
        }
        // Sort by timeSlot ascending
        return a.timeSlot.localeCompare(b.timeSlot);
      });
      return {
        then: (resolve) => resolve(sorted),
        catch: (reject) => resolve([])
      };
    },
    then: (resolve) => resolve(appointments)
  };

  return result;
};

Appointment.findOne = async function(query) {
  if (useMongo()) {
    return AppointmentModel.findOne(query);
  }

  const appointments = jsonDb.getAppointments();

  // Match the specific logic in POST route:
  // date: new Date(date), timeSlot, status: { $ne: 'cancelled' }
  const targetDate = query.date ? new Date(query.date).toISOString().split('T')[0] : null;
  const found = appointments.find(app => {
    const appDate = new Date(app.date).toISOString().split('T')[0];
    const matchDate = targetDate ? appDate === targetDate : true;
    const matchTime = query.timeSlot ? app.timeSlot === query.timeSlot : true;
    
    let matchStatus = true;
    if (query.status) {
      if (query.status.$ne) {
        matchStatus = app.status !== query.status.$ne;
      } else {
        matchStatus = app.status === query.status;
      }
    }
    return matchDate && matchTime && matchStatus;
  });

  if (!found) return null;

  // Wrap the found object to support `.save()`
  return new Appointment(found);
};

Appointment.findById = async function(id) {
  if (useMongo()) {
    return AppointmentModel.findById(id);
  }

  const appointments = jsonDb.getAppointments();
  const found = appointments.find(app => app._id === id);
  if (!found) return null;

  return new Appointment(found);
};

Appointment.findByIdAndDelete = async function(id) {
  if (useMongo()) {
    return AppointmentModel.findByIdAndDelete(id);
  }

  const appointments = jsonDb.getAppointments();
  const filtered = appointments.filter(app => app._id !== id);
  jsonDb.saveAppointments(filtered);
  return { _id: id };
};

module.exports = Appointment;
