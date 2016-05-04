module.exports = (request, response) =>  {
        var language = request.headers["accept-language"].slice(0,6),
            userAgent = request.headers["user-agent"],
            ipaddress = request.ip,
            OSregex = /\(([\w\s;]*)\)/g,
            ipv4Regex = /(\d{1,3}.?){4}/g;
            ipv6Regex = /(\w{0,4}:\d?)+/g;
            userAgent = userAgent.match(OSregex).toString();
            userAgent = userAgent.substring(1,userAgent.length - 1);
            ipv6 = ipaddress.match(ipv6Regex);
            ipv4 = ipaddress.match(ipv4Regex);
            ipaddress = ipv4 || ipv6;
            ipaddress = ipaddress.toString();
            headerInfo = {
                "ipaddress": ipaddress,
                "language": language,
                "software": userAgent
            }

        response.json(headerInfo);
    };
