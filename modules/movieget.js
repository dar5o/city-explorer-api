"use strict";
const axios = require("axios");
require('dotenv').config();
const MOVIES_API_KEY = process.env.MOVIES_API_KEY;
let cache = require('./cache.js');


async function moviesHandler(request, response) {
  try {
    let cityName = request.query.city;
    const key = 'movie-' + cityName;
    let resultsArr = [];
    let movieData = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${cityName}&api_key=${MOVIES_API_KEY}&language=en-US&page=1&include_adult=false`);
    //movie stuff here
    if (cache[key] && (Date.now() - cache[key].timestamp < (1000 * 60 * 60 * 24 * 30))) {
      console.log('Cache hit');
    } else {
      console.log('Cache miss. Writing to cache now');
      cache[key] = {};
      cache[key].timestamp = Date.now();
      cache[key].data = movieData.data.results.map(movie => new Movie(movie));
    }
    response.send(cache[key].data);
  } catch (error) {
    console.log(error)
    response.status(404).send('Something went wrong with the movie data!');
  }
}


class Movie {
  constructor(data) {
    this.title = data.title;
  }
}

module.exports = moviesHandler;