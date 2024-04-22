const mongoose = require('mongoose');

const vehicleStateSchema = new mongoose.Schema({
  vin: { type: String, required: true, unique: true },
  states: [{
    steering_wheel_angle: { type: Number, required: true },
    brake_pedal: { type: Boolean, required: true },
    acceleration_pedal: { type: Number, required: true }
  }]
});

const VehicleState = mongoose.model('VehicleState', vehicleStateSchema);

module.exports = VehicleState;
