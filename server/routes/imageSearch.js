'use strict';

const router = require('express').Router(),
      imageSearchHelper = require('../helpers/imageSearchHelper');

router.get('/', imageSearchHelper.search);
router.get('/recent', imageSearchHelper.recentSearches);

module.exports = router;
