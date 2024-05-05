const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rescueVehicleSchema = new Schema({
  type: {
    type: String,
    required: true,
    enum: ['Police', 'Fire', 'Ambulance'], // Typy vozidiel
    index: true
  },
  rescueCenterId: {
    type: Schema.Types.ObjectId,
    ref: 'RescueCenter',
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['Available', 'Busy', 'On the way'], // Stavy vozidla
    default: 'Available'
  },
  accidentId: {
    type: Schema.Types.ObjectId,
    ref: 'AccidentReport',
    default: null
  },
  defaultLocation: {
    coordinates: { type: [Number], default: [48.185, 17.138] } // [longitude, latitude]
  },
  currentLocation: {
    coordinates: { type: [Number], default: [48.185, 17.138] } // [longitude, latitude]
  }
}, {
  timestamps: true // Automaticky pridáva `createdAt` a `updatedAt`
});

const RescueUnit = mongoose.model('RescueUnit', rescueVehicleSchema);

module.exports = RescueUnit;
