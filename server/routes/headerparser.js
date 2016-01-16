var express = require('express'),
    router  = express.Router(),
    headerParser = require('./../helpers/header');

    router.get('/', headerParser);

module.exports = router;
