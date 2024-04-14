// models/Contact.js

const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true },
  department: { type: String, required: true },
  subdivision: { type: String },
  office: { type: String, required: true },
  fullName: { type: String, required: true },
  position: { type: String, required: true },
  officePhone: { type: String, required: true },
  internalPhone: { type: String },
  mobilePhone: { type: String, required: true },
  email: { type: String, required: true }
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;