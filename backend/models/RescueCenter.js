const mongoose = require('mongoose');

const rescueCenterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  contactNumber: {
    type: String,
    required: true
  },
  area: [{
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  }],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const RescueCenter = mongoose.model('RescueCenter', rescueCenterSchema);

module.exports = RescueCenter;
