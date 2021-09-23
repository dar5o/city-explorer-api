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



//hardwire port from .env
const url = process.env.URL;


let axios = require('axios');

app.get("/", (request, response) => {
  response.status(200).send("Hello again from tdfdfdfdfhe server response.send!");
});



// this constructor is for weather query
app.get("/weather", async (request, response) => {
  try {
    let forecastArr = [];
    let cityName = request.query.cityName;
    console.log(cityName);
    let lat = request.query.lat;
    let lon = request.query.lon;
    //call to weather api
    const weatherData = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily/?city=${cityName}&key=${process.env.WEATHER_API_KEY}`);
    const weatherInfo = weatherData.data.data.map(x => {
      return new Forecast(x);
    });
    
    forecastArr.push(weatherInfo);
    response.send(forecastArr);
  } catch (error) {
    response.status(404).send('Something went wrong with the weather data!');
  }
});

app.get('/movies', async (request, response) => {
  try {
    let cityName = request.query.city;
    let resultsArr = [];
    let movieData = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${cityName}&api_key=${process.env.MOVIES_API_KEY}&language=en-US&page=1&include_adult=false`);
    //movie stuff here
    console.log(movieData.data);
    movieData.data.results.map(movie => {
      resultsArr.push(new Movie(movie))
    });
    
    console.log(resultsArr);
    response.send(resultsArr);
  } catch (error) {
    console.log(error)
    response.status(404).send('Something went wrong with the movie data!');
  }
});
app.get('/*', (request, response) => {
  response.status(404).send('Something went wrong!');
});


//forecast object has 2 arrays, one for dates and the other for their corresponding weather report
class Forecast {
  constructor(data) {
    this.valid_date = data.valid_date;
    this.description = data.weather.description;
  }
}
class Movie {
  constructor(data) {
    this.title = data.title;
  }
}

// localhost:3001/anything
app.get('*',(request, response) => {
   response.status(404).send('route is not found');
})

app.listen(url, () => {
   console.log(`Listening on PORT ${url}`);
})