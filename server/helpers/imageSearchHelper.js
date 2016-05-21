'use strict';
const fetchDataFrom = require('./fetchDataFrom'),
      apiKeys = require('../config/apiKeys'),
      searchTermModel = require('../models/searchTerm.model');

module.exports.search = (request, response) => {
  let searchTerm = request.query.searchTerm,
      pageNumber = request.query.pageNumber || 1,
      newSearchTerm = new searchTermModel({
            searchTerm: searchTerm,
            pageNumber: pageNumber
          }).save().catch(error => {
            console.error(`Error occurred while saving model: ${error}`);
          });

  fetchDataFrom('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + apiKeys.flickr + '&tags=' + searchTerm + '&privacy_filter=1&safe_search=1&is_commons=true&per_page=10&page=' + pageNumber + '&format=json&nojsoncallback=1')
    .then((result) => {
      let pages = result.photos.pages,
          photos = result.photos.photo.map(x=>{
            return {
              title: x.title,
              url: "https://www.flickr.com/photos/" + x.owner + "/" + x.id
            }
          });

          response.send({
            pages: pages,
            photos: photos
          });
    });

};

module.exports.recentSearches = (request, response) => {
  searchTermModel.find({},{_id: 0, searchTerm: 1, pageNumber: 1, date: 1}).exec().then(results => {
    response.send(results);
  }).catch(error => {
    console.error(`Error occurred while fetching data: ${error}`);
  });
}
