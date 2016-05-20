'use strict';

module.exports = (URL) => {
  return new Promise((resolve, reject) => {
    const protocol = URL.startsWith('https') ? require('https') : require('http'),
          request = protocol.get(URL, (response) => {
            if(response.statusCode < 200 || response.statusCode > 299) {
              reject({
                message:`Failed to get resource`,
                code: response.statusCode
              });
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
};
