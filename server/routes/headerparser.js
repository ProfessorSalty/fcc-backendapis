const router = require('express').Router(),
    headerParser = require('./../helpers/header');

    router.get('/', headerParser);

module.exports = router;
