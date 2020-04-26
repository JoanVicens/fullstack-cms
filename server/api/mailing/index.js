const nodemailer = require('nodemailer');
const emailsTemplates = require('../config/emails.js');
const fs = require('fs');

var auth = {
  user: process.env.EMAIL_USER,
  pass: process.env.EMAIL_PASS
};


const transporter = nodemailer.createTransport({
  host: 'in-v3.mailjet.com',
  port: 587,
  secure: false,
  auth: auth,
  tls: {
      rejectUnauthorized: false
  }
});

exports.enviarCertificat = (music, opcions) => {
  const opt  = emailsTemplates.confirmacio;

  const recipient = music.email
  const id = music._id

  const certificatPath = `server/docs/${id}.pdf`

  var mailOptions = {
    from: opt.from,
    to: recipient,
    subject: 'Certificat crèdits',
    html: opcions.correu.cos,
    attachments:
    [
      {
         filename: 'certificat.pdf',
         path: certificatPath,
         contentType: 'Application/pdf'
      }
    ]
  };
  try {
    transporter.sendMail(mailOptions, (err, res) => {
      if (err) {
          console.log(err);
      } else {
          fs.unlinkSync(certificatPath)
          return res
      }
    });
  } catch(err) {
    console.error(err);
  }

}

exports.enviarCorreuConfirmacio = (recipient, token) => {

  const opt  = emailsTemplates.confirmacio;
  const direccio =  `${process.env.SERVER_URL}/auth/activate/${token}`;

  var mailOptions = {
    from: opt.from,
    to: recipient,
    subject: opt.subject,
    text: opt.text + token,
    html: `<strong>Clica al link per a confirmar el teu correu: </strong><a href="${direccio}">Confirmar correu!!</a>`
  };

  transporter.sendMail(mailOptions, (err, res) => {
    if (err) {
        console.log(err);
    } else {
        console.log(JSON.stringify(res));
    }
  });
}
