const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '../data');
const filePath = path.join(dataDir, 'appointments.json');

const ensureDirectoryExists = () => {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
};

const getAppointments = () => {
  ensureDirectoryExists();
  if (!fs.existsSync(filePath)) {
    return [];
  }
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading JSON DB:', err);
    return [];
  }
};

const saveAppointments = (appointments) => {
  ensureDirectoryExists();
  try {
    fs.writeFileSync(filePath, JSON.stringify(appointments, null, 2), 'utf8');
  } catch (err) {
    console.error('Error writing to JSON DB:', err);
  }
};

const generateId = () => {
  return Array.from({ length: 24 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
};

module.exports = {
  getAppointments,
  saveAppointments,
  generateId
};
