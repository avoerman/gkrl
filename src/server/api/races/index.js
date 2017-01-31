var express = require('express');
var controller = require('./races.controller');

var router = express.Router();

router.get('/races', controller.index);

module.exports = router;
