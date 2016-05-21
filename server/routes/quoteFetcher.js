'use strict';

const router = require('express').Router(),
      quoteHelper = require('../helpers/quoteHelper');

router.get('/', quoteHelper);

module.exports = router;
