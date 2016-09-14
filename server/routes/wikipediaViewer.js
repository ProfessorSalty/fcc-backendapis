const router = require("express").Router(),
    wikipediaHelper = require('../helpers/wikipediaHelper');

router.post('/', wikipediaHelper.search);
router.get('/top25', wikipediaHelper.top)

module.exports = router;
