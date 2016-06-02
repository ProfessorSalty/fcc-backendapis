'use strict';

module.exports = (requestObj) => {
  return new Promise((resolve, reject) => {
    const protocol = requestObj.protocol === 'https:' ? require('https') : require('http');
    protocol.get(requestObj, (response) => {
      if(response.statusCode < 200 || response.statusCode > 299) {
        reject({
          message:`Failed to get resource`,
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

/*
    options
    var requestObj = {
      protocol: 'https:',
      hostname: '',
      method: 'GET',
      path: '/',
      headers: {}
    }
    protocol: Protocol to use. Defaults to 'http:'.
    host: A domain name or IP address of the server to issue the request to. Defaults to 'localhost'.
    hostname: Alias for host. To support url.parse() hostname is preferred over host.
    family: IP address family to use when resolving host and hostname. Valid values are 4 or 6. When unspecified, both IP v4 and v6 will be used.
    port: Port of remote server. Defaults to 80.
    localAddress: Local interface to bind for network connections.
    socketPath: Unix Domain Socket (use one of host:port or socketPath).
    method: A string specifying the HTTP request method. Defaults to 'GET'.
    path: Request path. Defaults to '/'. Should include query string if any. E.G. '/index.html?page=12'. An exception is thrown when the request path contains illegal characters. Currently, only spaces are rejected but that may change in the future.
    headers: An object containing request headers.
    auth: Basic authentication i.e. 'user:password' to compute an Authorization header.
    agent: Controls Agent behavior. When an Agent is used request will default to Connection: keep-alive. Possible values:
        undefined (default): use http.globalAgent for this host and port.
        Agent object: explicitly use the passed in Agent.
        false: opts out of connection pooling with an Agent, defaults request to Connection: close.
    createConnection: A function that produces a socket/stream to use for the request when the agent option is not used. This can be used to avoid creating a custom Agent class just to override the default createConnection function. See agent.createConnection() for more details.

 */
