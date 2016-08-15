const router = require('express').Router(),
    nodemailer = require('nodemailer'),
    transporter = nodemailer.createTransport('smtps://warbread%40gmail.com:uficbvfxdanbjldp@smtp.gmail.com'),
    mailOptions = {
        from: 'Website Admin',
        to: 'crashingwaves@fea.st',
        subject: 'Web contact',
        text: 'Someone is contacting you!'
    };

router.post('/', (request, response) => {
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            return console.log(error);
        }
        response.status(200);
        response.send('message sent');
        console.log('Message sent: ' + info.response);
    });
});

module.exports = router;
