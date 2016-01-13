var express = require('express'),
    router  = express.Router(),
    timeFormat = require('./../helpers/timeFormatHelper');

router.route('/')
    .get(function(request, response) {
        response.send("Time required");
    });

router.route('/:time')
    .get(timeFormat);

module.exports = router;