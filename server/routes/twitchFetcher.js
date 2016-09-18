const router = require('express').Router(),
      twitchHelper = require('../helpers/twitchHelper');

router.get('/:userName', twitchHelper.fetchUser);
router.get('/search/:userName', twitchHelper.searchUser);

module.exports = router;
