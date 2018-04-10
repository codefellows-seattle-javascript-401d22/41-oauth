'use strict';

const express = require('express');
const call = require('superagent');
const dotenv = require('dotenv');

dotenv.load();
const app = express();


app.get('/oauth/google/code', function(req, res) {
  if(!req.query.code) {
    res.redirect(process.env.CLIENT_URL);
  } else {
    call.post('https://www.googleapis.com/oauth2/v4/token')
    .type('form')
    .send({
      code: req.query.code,
      grant_type: 'authorization_code',
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: `${process.env.API_URL}/oauth/google/code`
    })
    .then(response => {
      return call.get('https://www.googleapis.com/plus/v1/people/me/openIdConnect')
      .set('Authorization', `Bearer ${response.body.access_token}`);
    })
    .then(response => {
      res.cookie('X-some-cookie', 'some token');
      res.redirect(process.env.CLIENT_URL);
    })
  } 
})

app.listen(3000, () => {
  console.log('Server up on 3000');
});
      
    
      