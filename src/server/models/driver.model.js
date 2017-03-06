const mongoose = require('mongoose');

const driverSchema = mongoose.Schema({
  name: String
});

const Driver = mongoose.model('Driver', driverSchema);

module.exports = Driver;
