'use strict';

const fetchDataFrom = require('./fetchDataFrom'),
      apiKeys = require('../config/apiKeys');

module.exports = (request, response) => {

  const userName = request.params.userName;
  Promise.all([fetchDataFrom(`https://api.twitch.tv/kraken/streams/${userName}`),fetchDataFrom(`https://api.twitch.tv/kraken/channels/${userName}`)])
        .then((fetchedData) => {
          let streamData = fetchedData[0].stream,
              channelData = fetchedData[1];

          let twitchObj = {
            isStreaming: streamData ? true : false,
            game: streamData ? streamData.game : null,
            preview: streamData ? streamData.preview.large : null,
            status: channelData.status,
            display_name: channelData.display_name,
            logo: channelData.logo,
            url: channelData.url
          };
          response.send(twitchObj);
        })
        .catch((error) => {
          console.log(error);
          response.send(error);
        })
};
