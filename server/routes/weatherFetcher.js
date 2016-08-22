'use strict';

const router = require('express').Router(),
    config = require('../config/config'),
    weatherHelper = require('../helpers/weatherHelper');

router.get('/', (request, response) => {

});

router.post('/', weatherHelper);

module.exports = router;
