const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const raceSchema = Schema({
    _id: Number,
    date: Date,
});

const splitSchema = Schema({
    raceNumber: {type: Number, ref: 'Race'},
    time: Number,
    lap: Number,
    driverName: String
});

const Race = mongoose.model('Race', raceSchema);
const Split = mongoose.model('Split', splitSchema);

module.exports = {
    Race: Race,
    Split: Split
};
