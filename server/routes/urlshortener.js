'use strict';

const router = require('express').Router(),
      mongoose = require('mongoose'),
      config = require('../config/config.js'),
      dbPath = config.dbPath,
      urlHelper = require('../helpers/urlhelpers.js');

mongoose.connect(dbPath);

router.get('/', (request, response) => {
    response.render('shortener');
});

router.all(/\/new\/(http[s]?:\/\/)?(.+)/, urlHelper.processNewUrl);

router.get('/:encoded_id', urlHelper.processEncodedUrl);

module.exports = router;
