'use strict';
const router = require('express').Router(),
      multer = require('multer'),
      metadataParseHelper = require('../helpers/metadataParseHelper'),
      upload = multer({}),
      fileMetadataViewerText = require("../text/fileMetadataViewerText");

router.get('/', (request, response) => {
  response.render("apiInfo", fileMetadataViewerText);
});
router.get('/viewer', (request, response) => {
  response.render("metadataHandler");
});

router.post('/parse', upload.single('file'), metadataParseHelper);

module.exports = router;
