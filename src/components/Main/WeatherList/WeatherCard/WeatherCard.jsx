import React from "react";
import './WeatherCard.css';

const WeatherCard = ({
  dataCard: {
    dt_txt
  },
  dataClouds: {
    all
  },
  dataMain: {
    temp,
    temp_max,
    temp_min,
    humidity,
    feels_like
  },
  dataWeather: {
    description,
    icon,
    main
  },
  dataWind: {
    deg,
    speed
  }
}) => {

  const img_url = `https://openweathermap.org/img/wn/${icon}@2x.png`;

  const degreesToCompass = (deg) => {
    const directions = [
      "North", "North-Northeast", "Northeast", "East-Northeast", "East", "East-Southeast",
      "Southeast", "South-Southeast", "South", "South-Southwest", "Southwest", "West-Southwest",
      "West", "West-Northwest", "Northwest", "North-Northwest"
    ];
    const idx = Math.round(deg / 22.5) % 16;
    return directions[idx];
  }

  return (
    <article className="weather-card">
      <p>Date: {dt_txt}</p>
      <p>Max Temp: {Math.round((temp_max - 273.15) * 100) / 100} ºC</p>
      <p>Avg Temp: {Math.round((temp - 273.15) * 100) / 100} ºC</p>
      <p>Min Temp: {Math.round((temp_min - 273.15) * 100) / 100} ºC</p>
      <p>Humidity: {humidity} %</p>
      <p>Feels like: {Math.round((feels_like - 273.15) * 100) / 100} ºC</p>
      <p>Cloudiness: {all} %</p>
      <img src={img_url}></img>
      <p>Weather: {main}</p>
      <p>Description: {description}</p>
      <p>Wind Speed: {Math.round(((speed * 3.6)) * 100) / 100} Km/h</p>
      <p>Wind Direction: {degreesToCompass(deg)}</p>
    </article>
  )

};

export default WeatherCard;
