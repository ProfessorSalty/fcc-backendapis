const router = require('express').Router(),
    headerParser = require('./../helpers/header');

    router.get('/', (request, response) => {
      response.render('headerParser');
    });
    router.get('/parse', headerParser);

module.exports = router;
