"use strict";

const axios = require("axios");
require('dotenv').config();
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const cache = require('./cache.js');

function weatherHandler(lat, lon) {
  // let lat = request.query.lat;
  // let lon = request.query.lon;
  const key = 'weather-' + lat + lon;
  const url = `http://api.weatherbit.io/v2.0/forecast/daily/?key=${WEATHER_API_KEY}&lang=en&lat=${lat}&lon=${lon}&days=5`;

  if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) {
    console.log('Cache hit');
  } else {
    console.log('Cache miss');
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = axios.get(url)
      .then(response => parseWeather(response));
  }
  return cache[key].data;
}

function parseWeather(weatherData) {
  try {
    const weatherSummaries = weatherData.data.data.map(day => {
      return new Forecast(day);
    });
    return Promise.resolve(weatherSummaries);
  } catch (e) {
    return Promise.reject(e);
  }
}


class Forecast {
  constructor(data) {
    this.valid_date = data.valid_date;
    this.description = data.weather.description;
  }
}

module.exports = weatherHandler;