"use strict";
const axios = require("axios");
require('dotenv').config();
const MOVIES_API_KEY = process.env.MOVIES_API_KEY;

async function moviesHandler(request, response) {
  try {
    let cityName = request.query.city;
    let resultsArr = [];
    let movieData = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${cityName}&api_key=${MOVIES_API_KEY}&language=en-US&page=1&include_adult=false`);
    //movie stuff here
    console.log(movieData.data);
    movieData.data.results.map(movie => {
      resultsArr.push(new Movie(movie))
    });

    console.log(resultsArr);
    response.send(resultsArr);
  } catch (error){
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