var express = require('express'),
    app = express(),
    config = require('./config/config'),
    port = +process.argv[2] || config.devPort,
    time = require('./routes/timestamp'),
    headerParser = require('./routes/headerparser'),
    shortener = require('./routes/urlshortener'),
    bodyParser = require('body-parser'),
    expressHandlbars = require('express-handlebars'),
    viewsPath = __dirname + '/views',
    handlebarsHelpers = require('./helpers/handlebarsHelpers'),
    weatherFetcher = require('./routes/weatherFetcher'),
    twitchFetcher = require('./routes/twitchFetcher'),
    wikipediaViewer = require('./routes/wikipediaViewer'),
    quoteFetcher = require('./routes/quoteFetcher'),
    imageSearch = require('./routes/imageSearch'),
    fileMetadataViewer = require('./routes/fileMetadataViewer'),
    mailer = require('./routes/mailer.js');

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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', (request, response) => {
    response.render('index');
});

app.use('/time', time);

app.use('/header', headerParser);

app.use('/short', shortener);

app.use('/weather', weatherFetcher);

app.use('/twitch', twitchFetcher);

app.use('/wikiview', wikipediaViewer);

app.use('/quote', quoteFetcher);

app.use('/image', imageSearch);

app.use('/file', fileMetadataViewer);

app.use('/sendmail', mailer);

app.listen(port, () => {
    process.stdout.write(`Server listening on port ${port}
`);
});



