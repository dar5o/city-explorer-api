'use strict';

// don't forget to do an npm install:
// express, dotenv, cors, superagent

// bring in the express library
// initalizing the express library so I can use it
const express = require('express');
//allows us to access our env variables
require('dotenv').config();
const cors = require('cors');
const weatherData = require('./data/weather.json');
const weatherArray = weatherData.data;

const app = express();

app.use(cors());

//weather data


//hardwire port from .env
const PORT = process.env.PORT || 3000;

app.get("/", (request, response) => {
  response.status(200).send("Hello again from tdfdfdfdfhe server response.send!");
});



// this constructor is for weather query
app.get("/weather", (request, response) => {
  
  let cityName = request.query.cityName;

  let weatherInfo = weatherData.find(item => item.city_name === cityName)
   
  try {
    const newArray = weatherInfo.data.map((x) => {
    return new Forecast(x.valid_date, x.weather.description, weatherInfo.lat, weatherInfo.lon);
    }); 
    response.send(newArray);
  } catch(error) {
      console.log(error);
  }
  class Forecast {
    constructor(date1, description1, lat1, lon1){
      this.date = date1;
      this.description = description1;
      this.lat = lat1;
      this.lon = lon1;
    }
  }
  //let newArr = weatherInfo.data.map((x) => {
    //return new Forecast(x.valid_date, x.weather.description, weatherInfo.lat, weatherInfo.lon);
  //});

  
  //response.send(newArr);
  //console.log(newArr);
});


// localhost:3001/anything
app.get('*',(request, response) => {
   response.status(404).send('route is not found');
})

app.listen(PORT, () => {
   console.log(`Listening on PORT ${PORT}`);
})