'use strict';
const fetchDataFrom = require('./fetchDataFrom'),
      apiKeys = require('../config/apiKeys');

module.exports.search = (request, response) => {
  let searchTerm = request.query.searchTerm,
      pageNumber = request.query.pageNumber || 1;

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
