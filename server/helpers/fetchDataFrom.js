'use strict';

module.exports = (requestObj) => {
    return new Promise((resolve, reject) => {
        const protocol = requestObj.protocol === 'https:' ? require('https') : require('http');
        protocol.get(requestObj, (response) => {
            if (response.statusCode < 200 || response.statusCode > 299) {
                reject({
                    message: `Failed to get resource for ${requestObj.hostname}`,
                    statusCode: response.statusCode
                });
            }

            let body = '';
            response.on('data', (chunk) => {
                body += chunk;
            });

            response.on('end', () => {
                resolve(JSON.parse(body));
            });

            response.on('error', (error) => {
                reject(error)
            });
        });
    });
};

