const express = require('express');
const controller = require('./drivers.controller');

const router = express.Router();

router.get('/drivers/:id', controller.details);

module.exports = router;
