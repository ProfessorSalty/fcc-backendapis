'use strict';

const router = require('express').Router(),
      imageSearchHelper = require('../helpers/imageSearchHelper');

router.get('/', imageSearchHelper.search);

module.exports = router;
