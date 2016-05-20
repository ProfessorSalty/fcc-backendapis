'use strict';

const router = require('express').Router(),
      config = require('../config/config'),
      weatherHelper = require('../helpers/weatherHelper');

router.get('/', (request, response) => {

});

router.get('/:currentPosition', weatherHelper);

module.exports = router;
