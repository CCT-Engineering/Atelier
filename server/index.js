// REQUIRE STATEMENTS
require('dotenv').config();
const express = require('express');
const path = require('path');
const axios = require('axios');
const morgan = require('morgan');
const cors = require('cors');
const sessionHandler = require('./session-handler');

const app = express();

// APP-WIDE MIDDLEWARE
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
// Adds `req.session_id` based on the incoming cookie value.
// Generates a new session if one does not exist.
app.use(sessionHandler);
app.use(express.urlencoded({ extended: true }));

// STATIC SERVICE OF ASSETS
app.use(express.static(path.join(__dirname, '../client/dist')));

// ROUTES
app.all('/*', (req, res) => {
  axios({
    method: req.method,
    url: path.join(process.env.API_URL, req.url), // req.url will include query (?) and params (:)
    data: req.body,
    headers: {
      'User-Agent': 'request', // this might not be necessary?
      Authorization: process.env.AUTH,
    },
  })
    .then((resAPI) => res.status(resAPI.status).send(resAPI.data))
    .catch((errAPI) => {
      res.status(errAPI.response.status).send(errAPI);
    });
});

// PORT AND SERVER LISTEN
const PORT = process.env.PORT || 3300;
app.listen(PORT);
console.log(`Server listening at http://localhost:${PORT}`);
