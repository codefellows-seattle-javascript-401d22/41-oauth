'use strict';

const express = require('express');
const superagent = require('superagent');
const dotenv = require('dotenv')
const app = express();

app.get('/oauth/google/code', function(req,res){
  if(!req.query.code){
    res.redirect(process.env.CLIENT_URL);
  }else{
    superagent.post('https://googleapis.com/oauth2/v4/token')
    .type('form')
    .send({
      code: req.query.code,
      grant_type: 'authorization_code',
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secert: process.env.GOOGLE_CLIENT_SECERT,
      redirect_uri: `${process.env.API_URL}/oauth/google/code`
    })
    .then(response =>{
      console.log('::::initial req:::::::,', response.body);
      return superagent.get('htttps://www.googleapis.com/plus/v1/people/me/openIdConnect')
      .set('Authorization', `Bearer ${response.body.access_token}`)
    })
    .then(response => {
      console.log('::::OPEN ID - GOOGLE PLUS:::::', response.body);
      
    })
  }

});

app.listen(3000, () => {
  console.log('server up 3000' );
});