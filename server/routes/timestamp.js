const router = require('express').Router(),
      timeFormat = require('./../helpers/timeFormatHelper');

router.get('/', (request, response) => {
  response.render('timeFormatter');
});

router.get('/:time', timeFormat);

module.exports = router;
