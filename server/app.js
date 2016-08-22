const express = require('express'),
    app = express(),
    config = require('./config/config'),
    port = +process.argv[2] || config.devPort,
    time = require('./routes/timestamp'),
    headerParser = require('./routes/headerparser'),
    shortener = require('./routes/urlshortener'),
    bodyParser = require('body-parser'),
    jsonParser = bodyParser.json(),
    urlParser = bodyParser.urlencoded({
        extended: true
    })
expressHandlbars = require('express-handlebars'),
handlebarsHelpers = require('./helpers/handlebarsHelpers'),
weatherFetcher = require('./routes/weatherFetcher'),
twitchFetcher = require('./routes/twitchFetcher'),
wikipediaViewer = require('./routes/wikipediaViewer'),
quoteFetcher = require('./routes/quoteFetcher'),
imageSearch = require('./routes/imageSearch'),
fileMetadataViewer = require('./routes/fileMetadataViewer'),
mailer = require('./routes/mailer.js'),
viewsPath = __dirname + '/views',
logDir = __dirname + '/logs';

try {
    require('fs').statSync(logDir);
} catch ( e ) {
    require('fs').mkdirSync(logDir);
}

app.engine('handlebars', expressHandlbars({
    defaultLayout: 'main',
    layoutsDir: viewsPath + '/layouts',
    helpers: handlebarsHelpers
}));
app.set('view engine', 'handlebars');
app.set('views', viewsPath);

app.use((request, response, next) => {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (request, response) => {
    response.render('index');
});

app.use('/time', urlParser, time);

app.use('/header', urlParser, headerParser);

app.use('/short', urlParser, shortener);

app.use('/weather', jsonParser, weatherFetcher);

app.use('/twitch', twitchFetcher);

app.use('/wikiview', jsonParser, wikipediaViewer);

app.use('/quote', urlParser, quoteFetcher);

app.use('/image', urlParser, imageSearch);

app.use('/file', urlParser, fileMetadataViewer);

app.use('/sendmail', jsonParser, mailer);

app.listen(port, () => {
    process.stdout.write(`Server listening on port ${port}
`);
});



