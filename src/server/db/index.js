var path = require('path'),
      mongoose = require('mongoose'),
      models = require('../models/races.model.js');

//Connect to mLab database
//need to switch these to env variables
mongoose.connect('mongodb://admin:admin@ds135669.mlab.com:35669/gkrl');
//mongoose.connect('mongodb://localhost:27017/test');


var db = mongoose.connection;
mongoose.Promise = global.Promise;

db.Split = models.Split;
db.Race = models.Race;

//Starting
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connected to MongoDB');
});


module.exports = db;
