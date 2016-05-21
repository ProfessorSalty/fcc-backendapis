'use strict';
const fetchDataFrom = require("./fetchDataFrom");

module.exports.search = (request, response) => {
  const searchTerm = request.params.searchTerm;
  fetchDataFrom('https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch='+ searchTerm +'&utf8&format=json')
    .then((results) => {
      const filteredResults = results.query.search.map( x => {
        return {
          title: x.title,
          snippet: x.snippet,
          url: 'https://en.wikipedia.org/wiki/' + x.title.replace(/\s/g, '_')
        }
      });
      response.send(filteredResults);
    })
    .catch((error) => {
      response.send(error);
    })
};

module.exports.random = (request, response) => {
  fetchDataFrom('https://en.wikipedia.org/w/api.php?action=query&list=random&format=json&rnnamespace=0')
    .then((result) => {
      response.redirect('https://en.wikipedia.org/wiki/' + result.query.random.title);
    })
    .catch((error) => {
      response.send(error);
    })
};
