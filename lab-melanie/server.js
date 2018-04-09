'use strict';

const express = require('express');
const superagent = require('superagent');
const dotenv = require('dotenv');
const app = express();

dotenv.load();

app.get('/oauth/google/code', (req, res) => {
  if (!req.query.code) res.redirect(process.env.CLIENT_URL);
  if (req.query.code) {
    superagent.post('https://www.googleapis.com/oauth2/v4/token')
      .type('form')
      .send({
        code: req.query.code,
        grant_type: 'authorization_code',
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: `${process.env.API_URL}/oauth/google/code`,
      })
      .then(response => {
        return superagent.get('https://www.googleapis.com/plus/v1/people/me/openIdConnect')
          .set('Authorization', `Bearer ${response.body.access_token}`);
      })
      .then(response => res.redirect(process.env.CLIENT_URL))
      .catch(console.error);
  }
});

app.listen(3000, () => console.log(`server up`));