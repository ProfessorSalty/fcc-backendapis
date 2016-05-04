const router = require('express').Router(),
      timeFormat = require('./../helpers/timeFormatHelper'),
      helpText = require('../text/timeText');

router.get('/', (request, response) => {
  response.render('apiInfo', helpText);
});

router.get('/:time', timeFormat);

module.exports = router;
