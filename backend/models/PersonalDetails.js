const mongoose = require('mongoose');

const personalDetailsSchema = new mongoose.Schema({
  vin: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  bloodType: { type: String, required: true },
  insurance_company: { type: String, required: true }
});

const PersonalDetails = mongoose.model('PersonalDetails', personalDetailsSchema);

module.exports = PersonalDetails;
