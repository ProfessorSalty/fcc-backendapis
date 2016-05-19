'use strict';
const URL = require('../models/urlSchema.model.js'),
      codec = require('./urlcodec.js');


module.exports.processNewUrl = (request, response) => {

  let protocol = request.params[0],
      incomingUrl = request.params[1];

  if(!protocol) {
    protocol = "https://";
  }

  URL.findOne({'longUrl': incomingUrl},{'shortUrl': 1}, (err, doc) => {
    if(err) {throw err;}

    if(doc) {
      response.send({'shortUrl': request.hostname + "short/" + doc.shortUrl});
    } else {
      let newUrl = new URL({longUrl: incomingUrl, protocol: protocol});

      newUrl.save((error) => {
        if(error) {
        } else {
          var shortUrl = codec.encode(newUrl._id);
          newUrl.update({'shortUrl': shortUrl}, (err, raw) => {
            if(err){console.error(err);}
          });
          response.send({'shortUrl': request.hostname + "short/" + shortUrl});
        }
      });

    }
  });
};

module.exports.processEncodedUrl = (request, response) => {

  let input = request.params.encoded_id,
      decodedNumber = codec.decode(input);

  URL.findOne({_id: decodedNumber}, {'longUrl': 1, 'protocol': 1, _id: 0}, (err, doc) => {
    if(err) {console.error(err);}

    if(doc) {
        let longUrl = doc.protocol ? doc.protocol + doc.longUrl : doc.longUrl;
        response.redirect(302,longUrl);
      } else {
        response.send({error: "URL not found"});
      }

    });
};
