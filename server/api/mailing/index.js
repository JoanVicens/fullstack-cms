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

exports.enviarCorreuConfirmacio = async (recipient, token) => {

  const opt  = emailsTemplates.confirmacio;
  const direccio = `${process.env.SERVER_URL}/activacio/${token}`;

  var mailOptions = {
    from: opt.from,
    to: recipient,
    subject: opt.subject,
    text: opt.text + token,
    html: `<strong>Clica al link per a confirmar el teu correu: </strong><a href="${direccio}">Confirmar correu!!</a>`
  };

  try {
    return await transporter.sendMail(mailOptions);
  } catch(err) {
    return new Error(err)
  }

}

exports.enviarCorreu = (music, correu, adjunts) => {

  const opt = emailsTemplates.confirmacio

  const recipient = music.email || music.al + '@uji.es'

  const attachments = []

  if(adjunts) {
    adjunts.forEach(adjunt => {
      attachments.push({
        filename: adjunt.name,
        path: adjunt.uri
      })
    });
  }


  var mailOptions = {
    from: opt.from,
    to: recipient,
    subject: correu.assumpte,
    html: correu.html,
    attachments
  };


  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err, res) => {
        if (err) reject(err)

        resolve(res)
      })
    });

}


exports.enviarRecuperacio = (email, token) => {
  const opt  = emailsTemplates.confirmacio;
  console.log(token)
  const url = `${process.env.CLIENT_URL}/actualitzar?token=${token}`;

  var mailOptions = {
    from: opt.from,
    to: email,
    subject: 'Recuperació del compte',
    text: opt.text + token,
    html: `<strong>Utilitza aquest link per a recuperar el teu compte: </strong><a href="${url}" target="_blank">Recuperar compte</a>`
  };

  transporter.sendMail(mailOptions, (err, res) => {
    if (err) {
        console.log(err);
    } else {
        console.log(JSON.stringify(res));
    }
  });

}
