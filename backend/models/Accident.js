const mongoose = require('mongoose');

const accidentSchema = new mongoose.Schema({
  timestamp: { type: Date, required: true },
  vin: { type: String, required: true },
  last_timestamp_check: { type: Date, required: true },
  acceleration: { type: Number, required: true },
  speed: { type: Number, required: true },
  license_plates: [{ type: String, required: true }],
  coordinates: { type: [Number], required: true }, // [latitude, longitude]
  violations: [{
    type: { type: String, required: true },
    coordinates: { type: [Number], required: true }, // [latitude, longitude]
    timestamp: { type: Date, required: true }
  }],
  driver: {
    seatbelt: { type: Boolean, required: true },
    drowsiness: { type: Boolean, required: true },
    heart_rate: [Number] // Array of heart rate readings
  },
  passengers_num: { type: Number, required: true },
  status: { type: String, default: 'pending' },
  assignedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  rescuerIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'RescueUnit' }]
});

const AccidentReport = mongoose.model('AccidentReport', accidentSchema);

module.exports = AccidentReport;
