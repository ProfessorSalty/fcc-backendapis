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
    }),
    rateLimiter = require('express-rate-limit'),
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


app.enable('trust proxy')
//Rate limiters
const emailLimiter = new rateLimiter({
        windowMs: 15*60*1000, // 15 minutes
        max: 5,
        delayMs: 5000
    }),apiLimiter = new rateLimiter({
        windowMs: 15*60*1000, // 15 minutes
        max: 1000,
        delayMs: 2000
    }),quoteLimiter = new rateLimiter({
        windowMs: 15*60*1000, // 15 minutes
        max: 1000,
        delayMs: 2000,
        delayAfter: 100,
        message: "Too many requests"
    })

//Setup log folders
try {
    require('fs').statSync(logDir);
} catch ( e ) {
    require('fs').mkdirSync(logDir);
}

app.enable('trust proxy')

app.engine('handlebars', expressHandlbars({
    defaultLayout: 'main',
    layoutsDir: viewsPath + '/layouts',
    helpers: handlebarsHelpers
}));
app.set('view engine', 'handlebars');
app.set('views', viewsPath);

app.use((request, response, next) => {
    response.header("Access-Control-Allow-Origin", "https://gregoftheweb.com");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    response.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS")
    next();
});

app.get('/', (request, response) => {
    response.render('index');
});

app.use('/time', apiLimiter, urlParser, time);

app.use('/header', apiLimiter, urlParser, headerParser);

app.use('/short', apiLimiter, urlParser, shortener);

app.use('/weather', apiLimiter, jsonParser, weatherFetcher);

app.use('/twitch', apiLimiter, twitchFetcher);

app.use('/wikiview', apiLimiter, jsonParser, wikipediaViewer);

app.use('/quote', quoteLimiter, quoteFetcher);

app.use('/image', apiLimiter, urlParser, imageSearch);

app.use('/file', apiLimiter, urlParser, fileMetadataViewer);

app.use('/sendmail', emailLimiter ,urlParser, mailer);

app.listen(port, () => {
    process.stdout.write(`Server listening on port ${port}
`);
});



