const mongoose = require('mongoose');

const contactstDataSchema = new mongoose.Schema({
  vin : { type: String, required: true },
  contacts: [{
    name: { type: String, required: true },
    phone: { type: String, required: true },
  }]
});

const ContactsData = mongoose.model('Contacts', contactstDataSchema);

module.exports = ContactsData;
