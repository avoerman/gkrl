const express = require('express'),
    controller = require('./races.controller'),
    auth = require('../../auth');

const router = express.Router();

router.get('/races', controller.get);
router.post('/races', auth.authCheck, controller.add);
router.get('/race/:racenumber', controller.details);

module.exports = router;
