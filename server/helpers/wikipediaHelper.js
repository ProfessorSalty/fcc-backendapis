'use strict';
const fetchDataFrom = require("./fetchDataFrom");

function formatMonth(month) {
    month += 1;
    return month < 10 ? `0${month}` : month;
}

function formatDate(date) {
    date -= 1;
    return date < 10 ? `0${date}` : date;
}
module.exports.search = (request, response) => {
    const searchTerm = request.body.searchTerm,
        requestObj = {
            protocol: 'https:',
            hostname: 'en.wikipedia.org',
            path: `/w/api.php?action=query&list=search&srsearch=${searchTerm}&utf8&format=json`
        };

    fetchDataFrom(requestObj)
        .then((results) => {
            const filteredResults = results.query.search.map(x => {
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

module.exports.top = (request, response) => {
    const today = new Date(),
            requestObj = {
                protocol: "https:",
                hostname: "wikimedia.org",
                path: `/api/rest_v1/metrics/pageviews/top/en.wikipedia/all-access/${today.getUTCFullYear()}/${formatMonth(today.getUTCMonth())}/${formatDate(today.getUTCDate())}`
            };
            fetchDataFrom(requestObj)
                .then(results => {
                    const filteredResults = results.items[0].articles
                        .filter(result => !result.article.match(/(special\:|main)/i) && result.rank <= 25)
                        .map(result => ({title: result.article, url: `https://en.wikipedia.org/wiki/${result.article}`}))
                    response.send(filteredResults);
                })
                .catch(error => {
                    response.send(error);
                })
}