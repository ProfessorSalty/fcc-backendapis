const router = require('express').Router(),
    nodemailer = require('nodemailer'),
    transporter = nodemailer.createTransport('smtps://warbread%40gmail.com:uficbvfxdanbjldp@smtp.gmail.com');

router.post('/', (request, response) => {
    const message = `
      <h1>A message has arrived!</h1>
      <h2><b>From:</b> ${request.body.from}</h2>
      <p>${request.body.text}</p>
    `
    mailOptions = {
        from: request.body.from,
        to: 'crashingwaves@fea.st',
        subject: 'Someone is trying to contact you!',
        html: message
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
