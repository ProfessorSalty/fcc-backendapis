'use strict';
/**************PLAN**************
  Get weather data and location information from geolcation data passed from client
********************************/
const apiKeys = require('../config/apiKeys.js');
function fetchDataFrom(URL) {
  return new Promise((resolve, reject) => {
    const protocol = URL.startsWith('https') ? require('https') : require('http'),
          request = protocol.get(URL, (response) => {
            if(response.statusCode < 200 || response.statusCode > 299) {
              reject(Error(`Failed to get resource: ${response.statusCode}`))
            }

            let body = '';
            response.on('data', (chunk) => {
              body += chunk;
            });

            response.on('end', () => {
              resolve(JSON.parse(body));
            });
          });

      request.on('error', (error) => {
        reject(error)
      });

  });
}

function getNewDate(epoch) {
  const date = new Date(1000 * epoch);

    return {
      hours: date.getHours(),
      minutes: date.getMinutes(),
      day: date.getDay(),
      date: date.getDate(),
      month: date.getMonth()
    }
}

module.exports = function weatherHelper(request, response) {

  let currentPosition = request.params.currentPosition,
      weatherURL = 'https://api.forecast.io/forecast/' + apiKeys.weatherKey + '/'
              + currentPosition,
      cityURL = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + currentPosition + '&key=' + apiKeys.mapsKey;

  Promise.all([fetchDataFrom(weatherURL), fetchDataFrom(cityURL)])
    .then((data) => {
        const weatherData = data[0],
              cityData = data[1],
              city = cityData.results[1].formatted_address;
        let   currentWeather = weatherData.currently,
              nextWeekWeather = weatherData.daily.data;

        currentWeather = {
          time: getNewDate(currentWeather.time),
          summary: currentWeather.summary,
          icon: currentWeather.icon,
          precipProbability: currentWeather.precipProbability,
          temperature: currentWeather.temperature,
          windSpeed: currentWeather.windSpeed,
          windBearing: currentWeather.windBearing
        };

        nextWeekWeather = nextWeekWeather.map((x) => {
          return {
            time: getNewDate(x.time),
            summary: x.summary,
            icon: x.icon,
            precipProbability: x.precipProbability,
            temperature: x.temperature,
            windSpeed: x.windSpeed,
            windBearing: x.windBearing,
            sunriseTime: getNewDate(x.sunriseTime),
            sunsetTime: getNewDate(x.sunsetTime)
          };
        });

        response.send({
          city: city,
          currentWeather: currentWeather,
          nextWeekWeather: nextWeekWeather
        });

    })
    .catch((error) => {
      response.send(error);
    });
};
