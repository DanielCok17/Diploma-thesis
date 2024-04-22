const mongoose = require('mongoose');

const accidentStreamDataSchema = new mongoose.Schema({
  vin: { type: String, required: true },
  passengers: [{
    heart_rate: { type: Number, required: true }
  }]
});

const AccidentStreamData = mongoose.model('AccidentStreamData', accidentStreamDataSchema);

module.exports = AccidentStreamData;
