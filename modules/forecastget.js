"use strict";

const axios = require("axios");
require('dotenv').config();
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

async function weatherHandler(request, response) {

  try {
    let forecastArr = [];
    let cityName = request.query.cityName;
    console.log(cityName);
    let lat = request.query.lat;
    let lon = request.query.lon;
    //call to weather api
    const weatherData = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily/?city=${cityName}&key=${WEATHER_API_KEY}`);
    const weatherInfo = weatherData.data.data.map(x => {
      return new Forecast(x);
    });
    
    forecastArr.push(weatherInfo);
    response.send(forecastArr);
  } catch (error) {
    response.status(404).send('Something went wrong with the weather data!');
  }
}

class Forecast {
  constructor(data) {
    this.valid_date = data.valid_date;
    this.description = data.weather.description;
  }
}

module.exports = weatherHandler;