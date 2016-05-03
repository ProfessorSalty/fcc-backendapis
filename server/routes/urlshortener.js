'use strict';

const router = require('express').Router(),
      mongoose = require('mongoose'),
      dbPath = 'mongodb://localhost:27017/urls',
      urlHelper = require('../helpers/urlhelpers.js');

mongoose.connect(dbPath);

router.route('/').get((request, response) => {
    //Display web page
    response.send('Imma shorten things');
});

router.route(/\/new\/(http[s]?:\/\/)?(.+)/).all(urlHelper.processNewUrl);

router.route('/:encoded_id').get(urlHelper.processEncodedUrl);

module.exports = router;
