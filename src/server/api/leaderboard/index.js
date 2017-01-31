var express = require('express');
var controller = require('./leaderboard.controller');

var router = express.Router();

router.get('/leaderboard', controller.index);

module.exports = router;


