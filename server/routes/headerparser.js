const router = require('express').Router(),
      headerParser = require('./../helpers/header'),
      helpText = require('../text/headerText');

    router.get('/', (request, response) => {
      response.render('apiInfo', helpText);
    });
    router.get('/parse', headerParser);

module.exports = router;
