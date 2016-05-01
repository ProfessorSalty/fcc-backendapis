const router = require('express').Router(),
          timeFormat = require('./../helpers/timeFormatHelper');

router.route('/')
    .get((request, response) => {
        response.send("Time required");
    });

router.route('/:time')
    .get(timeFormat);

module.exports = router;
