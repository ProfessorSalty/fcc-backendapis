const router = require('express').Router(),
    nodemailer = require('nodemailer'),
    smtpConfig = require('../config/apiKeys.js').smtp,
    transporter = nodemailer.createTransport(smtpConfig),
    winston = require('winston'),
    path = require('path'),
    logPath = path.resolve(__dirname, '..', 'logs'),
    logger = new (winston.Logger)({
        transports: [
            new (winston.transports.Console)(),
            new (winston.transports.File)({
                name: 'error-file',
                filename: logPath + '/error-file.winston_log',
                level: 'error'
            }),
            new (winston.transports.File)({
                name: 'debug-file',
                filename: logPath + '/debug-file.winston_log',
                level: 'debug'
            })
        ]
    });

router.post('/', (request, response) => {
    console.log(request.body);
    const message = `
      <h1>A message has arrived!</h1>
      <h2><b>From:</b> ${request.body.name} : ${request.body.email}</h2>
      <p>${request.body.message}</p>
    `
    logger.info('New message coming in:', request.body);

    mailOptions = {
        from: request.body.email,
        to: 'crashingwaves@fea.st',
        subject: 'Someone is trying to contact you!',
        html: message
    };

    logger.debug('mailOptions content:', mailOptions);

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            response.status(500);
            response.send(error);
            return logger.error(error);
        }
        response.status(200);
        response.send('message sent');
        logger.info('Message sent: ' + info.response);
    });
});

module.exports = router;
