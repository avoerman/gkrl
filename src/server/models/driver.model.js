const mongoose = require('mongoose');

const racerSchema = mongoose.Schema({
  name: String
});

const Driver = mongoose.model('Driver', racerSchema);

module.exports = Driver;
