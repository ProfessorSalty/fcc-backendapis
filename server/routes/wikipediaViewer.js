const router = require("express").Router(),
    wikipediaHelper = require('../helpers/wikipediaHelper');

// router.get('/', wikipediaHelper.random);
router.post('/', wikipediaHelper.search);

module.exports = router;
