var express = require('express'),
    app     = express(),
    port    = 9000,
    time    = require('./routes/timestamp'),
    headerParser = require('./routes/headerparser'),
    shortener = require('./routes/urlshortener');



    // app.use(function(req, res, next) {
    //   res.header("Access-Control-Allow-Origin", "*");
    //   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    //   next();
    // });

    app.get('/', function(request, response) {
       response.send("Main page");
    });

    app.use('/time', time);

    app.use('/header', headerParser);

    app.use('/short', shortener);

    app.listen(port, function() {
        process.stdout.write(`Server listening on port ${port}\n`);
    });



