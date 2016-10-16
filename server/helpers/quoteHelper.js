'use strict';
const fetchDataFrom = require('./fetchDataFrom'),
    quoteKey = require('../config/apiKeys.js').quotes,
    quotes = require('../text/quotes.json').quotes;

module.exports = (request, response) => {
  const randomNumber = Math.floor(Math.random() * (quotes.length + 1)),
        quote = quotes[randomNumber][0],
        author = quotes[randomNumber][1];

//Get wikipedia page based on the quote author's name
  const wikiRequest = {
        protocol: 'https:',
        hostname: 'en.wikipedia.org',
        path: `/w/api.php?action=query&list=search&srsearch=${author.replace(/\s/g, '+')}&utf8&format=json`
      }

  fetchDataFrom(wikiRequest)
        .then(queries => {
          response.send({
            quote: quote,
            author: author,
            description: queries.query.search[0].snippet,
            wikipediaLink: `https://en.wikipedia.org/wiki/${author.replace(/\s/g, '_')}`
          });
        })
    .catch(error => {
      console.log(error);
      response.status(500).send(error);
    });
};
