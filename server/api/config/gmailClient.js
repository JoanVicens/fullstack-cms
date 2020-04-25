'use strict';

const {google} = require('googleapis');
const http = require('http');
const url = require('url');
const opn = require('open');
const fs = require('fs');
const readline = require('readline');
const destroyer = require('server-destroy');
const path = require('path');

const TOKEN_PATH = 'autGmail.json';


class GmailClient {
  constructor() {
    this.oAuth2Client = new google.auth.OAuth2(
      process.env.GMAIL_ID_CLIENT,
      process.env.GMAIL_SECRET,
      process.env.GOOGLE_API_REDIRECT_URI
    );
  }

  async authenticate(scopes) {
    return new Promise((resolve, reject) => {
      const authUrl = this.oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes,
      });
      console.log('Authorize this app by visiting this url:', authUrl);
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      rl.question('Enter the code from that page here: ', (code) => {
        rl.close();
        this.oAuth2Client.getToken(code, (err, token) => {
          if (err) {
            console.error('Error retrieving access token', err);
            return false;
          }
          this.oAuth2Client.setCredentials(token);
          // Store the token to disk for later program executions
          fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
            if (err) reject(err);
            console.log('Token stored to', TOKEN_PATH);
          });
          resolve(this.oAuth2Client)
        });
      });
    });
  }
}


module.exports = new GmailClient();
