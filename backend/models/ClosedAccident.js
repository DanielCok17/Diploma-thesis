const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const closedAccidentSchema = new Schema({
  accidentId: {
    type: Schema.Types.ObjectId,
    ref: 'Accident', // Assuming you have an Accident model
    required: true
  },
  userIds: [{
    type: Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model
    required: true
  }],
  rescueUnits: [{
    rescueUnitsId: { type: String}, // Reference to RescueUnit model
  }],
  note: {
    type: String,
    required: true
  },
  severity: {
    type: String,
    enum: ['simple', 'moderate', 'critical'], // Enum to control the values of severity
    required: true
  },
  passengerNotes: [{
    notes: { type: String }
  }],
  closedAt: {
    type: Date,
    default: Date.now // Automatically set the close time to now when a record is created
  }
});

const ClosedAccident = mongoose.model('ClosedAccident', closedAccidentSchema);

module.exports = ClosedAccident;
