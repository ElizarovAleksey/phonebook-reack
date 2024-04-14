const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    departments: [{
      name: { type: String, required: true },
      subdivisions: [String],
      offices: [String]
    }]
  });

const Organization = mongoose.model('Organization', organizationSchema);

module.exports = Organization;