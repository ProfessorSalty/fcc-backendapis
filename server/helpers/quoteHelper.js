'use strict';
const fetchDataFrom = require('./fetchDataFrom'),
    quoteKey = require('../config/apiKeys.js').quotes;

module.exports = (request, response) => {
  //Get quotes from server
  const requestObj = {
                      protocol: 'http:',
                      hostname: 'www.stands4.com',
                      path: `/services/v2/quotes.php?uid=${quoteKey.uid}&tokenid=${quoteKey.key}&searchtype=RANDOM&format=json`
                    };
  fetchDataFrom(requestObj)
    .then(result => {
      let quote = {
        text: result.results.result[0].quote[0] || result.results.result[0].quote || "No text found on server",
        author: result.results.result[0].author[0]
      };
      //Get wikipedia page based on the quote author's name
      const wikiRequest = {
        protocol: 'https:',
        hostname: 'en.wikipedia.org',
        path: `/w/api.php?action=query&list=search&srsearch=${encodeURI(quote.author)}&utf8&format=json`
      }
      return fetchDataFrom(wikiRequest)
        .then(queries => {
          response.send({
            quote: quote.text.replace(/(?:\<\/?\w*\>)|[\n\r]+/g, "").trim(),
            author: quote.author,
            description: queries.query.search[0].snippet,
            wikipediaLink: `https://en.wikipedia.org/wiki/${quote.author.replace(/\s/g, '_')}`
          });
        });
    })
    .catch(error => {
      response.send(error);
    });
};
