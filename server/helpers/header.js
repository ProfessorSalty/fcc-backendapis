module.exports = function(request, response) {
        var language = request.headers["accept-language"].slice(0,6),
            userAgent = request.headers["user-agent"],
            ipaddress = request.ip,
            OSregex = /\(([\w\s;]*)\)/g,
            ipRegex = /[\d{1,3}.]+/g;

            userAgent = userAgent.match(OSregex).toString();
            userAgent = userAgent.substring(1,userAgent.length - 1);

            ipaddress = ipaddress.match(ipRegex).toString();

            headerInfo = {
                "ipaddress": ipaddress,
                "language": language,
                "software": userAgent
            }

        response.json(headerInfo);
    };