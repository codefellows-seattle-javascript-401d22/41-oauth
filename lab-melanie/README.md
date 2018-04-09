# ![cf](https://i.imgur.com/7v5ASc8.png) Lab 41: OAuth - Part 1

## App Directory
* **README.md**
* **.gitignore**
* **.eslintrc**
* **.eslintignore**
* **package.json**
  * a `start` script has been configured for running the server
* **index.html**
* **server.js**

## .env Configuration
To successfully run this application, the user must create up a `.env` file locally with the following fields:
```
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
CLIENT_URL=http://localhost:8080
API_URL=http://localhost:3000
```
The user must create a project and obtain credentials for the `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` fields. The `GOOGLE_CLIENT_ID` key must also be inserted into the `index.html` file on line 12:

```
let clientIDQuery = `client_id=<insert GOOGLE_CLIENT_ID here>`;
```


## Installation
#### Back-end
1. To start, download this repository and run `npm i`
2. Set up a .env file per the instructions above
3. Use `npm run start` to run the app locally on `localhost:3000`.
4. Verify your server is running before launching the front-end app.

#### Front-end
1. Once the back-end portion of your app is running, use `live-server` to run your front-end code
2. Click on the link within your browser window and authorize usage of a Google account and you're good to go.