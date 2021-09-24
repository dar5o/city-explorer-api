'use strict';

// don't forget to do an npm install:
// express, dotenv, cors, superagent

// bring in the express library
// initalizing the express library so I can use it
const express = require('express');
//allows us to access our env variables
require('dotenv').config();
const cors = require('cors');
const app = express();
app.use(cors());

//constructing superagent
const superagent = require('superagent');

//hardwire port from .env

const PORT = process.env.PORT;

const weatherHandler = require('./modules/forecastget');
const moviesHandler = require('./modules/movieget');

app.get("/", (request, response) => {
  response.status(200).send("Hello again from tdfdfdfdfhe server response.send!");
});
app.get("/weather", weatherHandler);
app.get('/movies', moviesHandler);
app.get('/*', (request, response) => {
  response.status(404).send('Something went wrong!');
});

// localhost:3001/anything
app.get('*',(request, response) => {
   response.status(404).send('route is not found');
})

app.listen(PORT, () => {
   console.log(`Listening on PORT ${PORT}`);
})