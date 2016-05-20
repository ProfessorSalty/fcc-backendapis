const router = require('express').Router(),
      twitchHelper = require('../helpers/twitchHelper');

router.get('/:userName', twitchHelper);

module.exports = router;
