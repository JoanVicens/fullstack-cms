// https://medium.com/@RistaSB/use-expressjs-to-send-mails-with-gmail-oauth-2-0-and-nodemailer-d585bba71343

const nodemailer = require('nodemailer');
const emailsTemplates = require('../config/emails.js');

var auth = {
  user: process.env.EMAIL_USER,
  pass: process.env.EMAIL_PASS
};

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth
})

const mailOptions = {
  from: 'no-reply@bandauji.com',
  to: 'jwcervera@hotmail.com',
  subject: 'nodemailer test',
  text: 'test email'
}

const enviarCorreuConfirmacio = (recipient, token) => {

  const opt  = emailsTemplates.confirmacio;
  console.log(httpServer.address().address);
  const direccio =  `${process.env.SERVER_URL}/auth/activate/${token}`;

  console.log(recipient);

  var mailOptions = {
    from: opt.from,
    to: recipient,
    subject: opt.subject,
    text: opt.text + token,
    html: `<strong>Clica al link per a confirmar el teu correu: </strong><a href="${direccio}">Confirmar correu!!</a>`
  };
  var transporter = nodemailer.createTransport({
    host: 'in-v3.mailjet.com',
    port: 587,
    secure: false,
    auth: auth,
    tls: {
        rejectUnauthorized: false
    }
  });
  transporter.sendMail(mailOptions, (err, res) => {
    if (err) {
        console.log(err);
    } else {
        console.log(JSON.stringify(res));
    }
  });
}

module.exports = {
  enviarCorreuConfirmacio
}
