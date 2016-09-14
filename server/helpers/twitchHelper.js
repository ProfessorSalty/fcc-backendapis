'use strict';

const fetchDataFrom = require('./fetchDataFrom'),
      apiKeys = require('../config/apiKeys');

module.exports = (request, response) => {

    const userName = request.params.userName,
        streamObj = {
            protocol: 'https:',
            hostname: 'api.twitch.tv',
            path: `/kraken/streams/${userName}`,
            headers: {
              'Client-ID': apiKeys.twitchClientId
            }
        },
        channelObj = {
            protocol: 'https:',
            hostname: 'api.twitch.tv',
            path: `/kraken/channels/${userName}`,
            headers: {
              'Client-ID': apiKeys.twitchClientId
            }
        };
    Promise.all([fetchDataFrom(streamObj), fetchDataFrom(channelObj)])
        .then((fetchedData) => {
            let streamData = fetchedData[0].stream,
                channelData = fetchedData[1];

            let twitchObj = {
                isStreaming: streamData ? true : false,
                game: streamData ? streamData.game : null,
                preview: streamData ? streamData.preview.large : null,
                status: channelData.status,
                display_name: channelData.display_name,
                logo: channelData.logo || "http://static-cdn.jtvnw.net/jtv_user_pictures/xarth/404_user_150x150.png",
                url: channelData.url
            };
            response.send(twitchObj);
        })
        .catch((error) => {
            if (error.statusCode === 404) {
                response.status(404).send({
                    isStreaming: false,
                    game: null,
                    preview: null,
                    status: "User does not exist",
                    display_name: userName,
                    logo: "http://static-cdn.jtvnw.net/jtv_user_pictures/xarth/404_user_150x150.png",
                    url: null
                })
            } else {
                response.status(error.statusCode).send(error);
            }
        })
};
