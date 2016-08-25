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
                try {

                resolve(JSON.parse(body));
                } catch(e) {
                require('xml2js').parseString(body, (error, data) => {
                    if(error) { reject(error); }
                    resolve(data);
                });
            }
            });

            response.on('error', (error) => {
                reject(error)
            });
        });
    });
};

