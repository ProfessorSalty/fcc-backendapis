const router = require('express').Router(),
    nodemailer = require('nodemailer'),
    transporter = nodemailer.createTransport('smtps://warbread%40gmail.com:uficbvfxdanbjldp@smtp.gmail.com');

router.post('/', (request, response) => {
    mailOptions = {
        from: request.body.from,
        to: 'crashingwaves@fea.st',
        subject: 'Someone is trying to contact you!',
        text: request.body.text
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            response.status(500);
            response.send(error);
            return console.log(error);
        }
        response.status(200);
        response.send('message sent');
        console.log('Message sent: ' + info.response);
    });
});

module.exports = router;
