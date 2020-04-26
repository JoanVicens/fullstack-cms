const {google} = require('googleapis');
const fs = require('fs');

const credencials = require('../config/credencials_gmail');

const MailComposer = require("nodemailer/lib/mail-composer");

exports.enviarCertificat = (id) => {
  credencials.authorize(async(auth) => {
    try {
      const gmail = google.gmail({version: 'v1', auth});


      //
      // const certificat = fs.readFileSync(`server/docs/${id}.pdf`)
      //
      //
      // const attachment = {
      //   filename: 'certificat.pdf',
      //   contentType: 'application/pdf',
      //   contentDisposition: 'attachment',
      //   content: certificat
      // }

      // const subject = '🤘 Hello 🤘';
      // const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString('base64')}?=`;
      // const messageParts = [
      //   'From: myselfjwc@gmail.com',
      //   'To: myselfjwc@gmail.com',
      //   'Content-Type: text/html; charset=utf-8',
      //   'MIME-Version: 1.0',
      //   `Subject: ${utf8Subject}`,
      //   '',
      //   'This is a message just to say hello.',
      //   'So... <b>Hello!</b>  🤘❤️😎',
      // ];
      // const message = messageParts.join('\n');



      var message = {
        'Content-Type': 'multipart/mixed',
        from: "myselfjwc@gmail.com",
        to:'jwcervera@hotmail.com',
        subject: 'certificat',
        html: '<h1>attachment</h1>',
        uploadType: 'media',
        attachments:
         [
          {
             // filename: `${id}.pdf`,
             // content: fs.createReadStream(`server/assets/images/banda_uji.png`),
             content: fs.createReadStream(`server/docs/${id}.pdf`),
             // contentType: '1.0',
             // path: `server/docs/${id}.pdf`,
             contentType: 'Application/pdf',
             // contentTransferEncoding: 'base64',
             encoding: 'base64'
          }
        ]
     };

     //Content-Transfer-Encoding', '7bit'

     var mail = new MailComposer(message);

     mail.compile().build(async (err, message) => {
       const encodedMessage = Buffer.from(message)
         .toString('base64')
         .replace(/\+/g, '-')
         .replace(/\//g, '_')
         .replace(/=+$/, '');


       const res = await gmail.users.messages.send({
         userId: 'me',
         requestBody: {
           raw: encodedMessage,
         },
       });
       console.log(res.data);
     })


      // simpleParser(message, attachment, async (err, parsed) => {
      //   if(err) {
      //     console.error(err);
      //     return
      //   }
      //
      //   const encodedMessage = Buffer.from(parsed)
      //     .toString('base64')
      //     .replace(/\+/g, '-')
      //     .replace(/\//g, '_')
      //     .replace(/=+$/, '');
      //
      //   const res = await gmail.users.messages.send({
      //     userId: 'me',
      //     requestBody: {
      //       raw: encodedMessage,
      //     },
      //   });
      //   console.log(res.data);
      //
      // });


      // The body needs to be base64url encoded.
    //   const encodedMessage = Buffer.from(message)
    //     .toString('base64')
    //     .replace(/\+/g, '-')
    //     .replace(/\//g, '_')
    //     .replace(/=+$/, '');
    //
    //   const res = await gmail.users.messages.send({
    //     userId: 'me',
    //     requestBody: {
    //       raw: encodedMessage,
    //     },
    //   });
    //   console.log(res.data);
    // } catch(err) {
    //   console.error(err);
    // }
    } catch(err) {
      console.error(err);
    }

  })
}
