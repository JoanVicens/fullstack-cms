const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');


const SCOPES = ['https://www.googleapis.com/auth/drive'];

const TOKEN_PATH = 'autenticacioDrive.json';


const credentials = {
  client_secret: process.env.DRIVE_SECRET,
  client_id: proces.env.DRIVE_ID_CLIENT,
  redirect_uris: [
    'https://murmuring-brushlands-62030.herokuapp.com'
  ]
}


exports.authorize = (callback, doc) => {
  const oAuth2Client = new google.auth.OAuth2(
      credentials.client_id, credentials.client_secret, credentials.redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getAccessToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client, doc);
  });
}

function authorize(credentials, callback) {
  const oAuth2Client = new google.auth.OAuth2(
      credentials.client_id, credentials.client_secret, credentials.redirect_uris[0]);

    fs.readFile(TOKEN_PATH, (err, token) => {
      if (err)
      {
        return getAccessToken(oAuth2Client, callback);

      }
      oAuth2Client.setCredentials(JSON.parse(token));
      callback(oAuth2Client);
    });
  }



function getAccessToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);

      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
      });
      callback(oAuth2Client);
    });
  });
}
