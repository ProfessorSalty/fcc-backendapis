const router = require("express").Router(),
      wikipediaHelper = require('../helpers/wikipediaHelper');

router.get('/', wikipediaHelper.random);
router.get('/:searchTerm', wikipediaHelper.search);

module.exports = router;
