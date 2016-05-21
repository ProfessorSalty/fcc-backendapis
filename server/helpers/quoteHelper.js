'use strict';
const fetchDataFrom = require('./fetchDataFrom');

module.exports = (request, response) => {
  //Get quotes from server
  const quotesURL = "http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1";
  fetchDataFrom(quotesURL)
    .then(result => {
      let quote = result[0];
    //Get wikipedia page based on the quote author's name
      return fetchDataFrom('https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch='+ quote.title +'&utf8&format=json')
        .then(queries => {
          response.send({
            quote: quote.content.replace(/(?:\<\/?\w*\>)|[\n\r]+/g, "").trim(),
            author: quote.title,
            description: queries.query.search[0].snippet,
            wikipediaLink: 'https://en.wikipedia.org/wiki/' + quote.title.replace(/\s/g, '_')
          });
        })
    })
    .catch(error => {
      response.send(error);
    });
};
