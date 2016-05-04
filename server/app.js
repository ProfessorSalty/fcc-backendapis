var express = require('express'),
    app     = express(),
    config  = require('./config/config.js'),
    port    = +process.argv[2] || config.devPort,
    time    = require('./routes/timestamp'),
    headerParser = require('./routes/headerparser'),
    shortener = require('./routes/urlshortener'),
    bodyParser = require('body-parser'),
    expressHandlbars = require('express-handlebars'),
    viewsPath = __dirname + '/views';

    app.engine('handlebars', expressHandlbars({defaultLayout: 'main', layoutsDir: viewsPath + '/layouts'}));
    app.set('view engine', 'handlebars');
    app.set('views', viewsPath);

    app.use((request, response, next) => {
      response.header("Access-Control-Allow-Origin", "*");
      response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.get('/', (request, response) => {
       response.render('index');
    });

    app.use('/time', time);

    app.use('/header', headerParser);

    app.use('/short', shortener);

    app.listen(port,  () => {
        process.stdout.write(`Server listening on port ${port}\n`);
    });



