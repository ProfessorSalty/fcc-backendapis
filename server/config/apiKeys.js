module.exports = {
    weatherKey: process.env.WEATHER_KEY,
    mapsKey: process.env.MAPS_KEY,
    twitchClientId: process.env.TWITCH_CLIENT_ID,
    twitchSecret: process.env.TWITCH_SECRET,
    flickr: process.env.FLICKR_KEY,
    smtp: {
        host: 'mail.gandi.net',
        port: 465,
        secure: true, // use SSL
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD
        }
    }
}
