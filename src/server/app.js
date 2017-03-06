const express = require('express'),
    path = require('path'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    races = require('./api/races'),
    leaderboard = require('./api/leaderboard'),
    drivers = require('./api/drivers');

const app = express();
app.set('port', (process.env.PORT || 3000));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(cors());

app.use('/', express.static(__dirname + '/../../dist'));
app.use('/api', races);
app.use('/api', leaderboard);
app.use('/api', drivers);

app.use(morgan('dev'));

// all other routes are handled by Angular
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '/../../dist/index.html'));
});

app.listen(app.get('port'), function () {
    console.log('Angular 2 Full Stack listening on port ' + app.get('port'));
});

module.exports = app;
