'use strict';
const fetchDataFrom = require('./fetchDataFrom');

module.exports = (request, response) => {
  //Get quotes from server
  const requestObj = {
                      protocol: 'http:',
                      hostname: 'www.quotesondesign.com',
                      path: '/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1'
                    };
  fetchDataFrom(requestObj)
    .then(result => {
      let quote = result[0];
      //Get wikipedia page based on the quote author's name
      const wikiRequest = {
        protocol: 'https:',
        hostname: 'en.wikipedia.org',
        path: `/w/api.php?action=query&list=search&srsearch=${encodeURI(quote.title)}&utf8&format=json`
      }
      return fetchDataFrom(wikiRequest)
        .then(queries => {
          response.send({
            quote: quote.content.replace(/(?:\<\/?\w*\>)|[\n\r]+/g, "").trim(),
            author: quote.title,
            description: queries.query.search[0].snippet,
            wikipediaLink: `https://en.wikipedia.org/wiki/${quote.title.replace(/\s/g, '_')}`
          });
        }).catch(error => {
          resonse.send(error);
        });
    })
    .catch(error => {
      response.send(error);
    });
};
