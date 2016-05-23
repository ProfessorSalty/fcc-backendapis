'use strict';

const router = require('express').Router(),
      imageSearchHelper = require('../helpers/imageSearchHelper'),
      imageSearchText = require('../text/imageSearchText');

router.get('/', (request, response) => {
  response.render('apiInfo', imageSearchText);
});
router.get('/search', imageSearchHelper.search);
router.get('/recent', imageSearchHelper.recentSearches);

module.exports = router;
