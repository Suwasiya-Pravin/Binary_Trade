const mongoose = require('mongoose');

// Define the ContactUs schema
const contactUsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create the ContactUs model
const ContactUs = mongoose.model('ContactUs', contactUsSchema);

module.exports = ContactUs;
