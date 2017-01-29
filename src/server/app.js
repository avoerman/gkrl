const express = require('express'),
    path = require('path'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    races = require('./routes/races'),
    leaderboard = require('./routes/leaderboard');

const app = express();
app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(__dirname + '/../../dist'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(morgan('dev'));

// Mongo
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test');
var db = mongoose.connection;
mongoose.Promise = global.Promise;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connected to MongoDB');

    //API
    app.get('/api/racesummary', races.getRaceSummary);
    app.get('/api/leaderboardsummary', leaderboard.getLeaderBoardSummary);


    // all other routes are handled by Angular
    app.get('/*', function (req, res) {
        res.sendFile(path.join(__dirname, '/../../dist/index.html'));
    });

    app.listen(app.get('port'), function () {
        console.log('Angular 2 Full Stack listening on port ' + app.get('port'));
    });
});

module.exports = app;
