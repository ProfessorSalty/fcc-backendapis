var express = require('express'),
    app     = express(),
    port    = 9000,
    time    = require('./routes/timestamp');

    app.get('/', function(request, response) {
       response.send("Main page");
    });

    app.use('/time', time);

    app.listen(port, function() {
        process.stdout.write(`Server listening on port ${port}\n`);
    });



