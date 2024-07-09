import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import WeatherCard from './WeatherCard';
import './WeatherList.css';

const WeatherList = () => {

  const weatherApiKey = import.meta.env.VITE_WEATHER_API_KEY;

  let userLocation;
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          userLocation = [latitude, longitude];
          // console.log(userLocation);
          getCityByCoords();
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    }
    else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  const getCityByCoords = async () => {
    try {
      // Petición HTTP
      const res = await axios.get(`http://api.openweathermap.org/geo/1.0/reverse?lat=${userLocation[0]}&lon=${userLocation[1]}&appid=${weatherApiKey}`);
      // console.log(res);
      const json = res.data;
      // console.log(json[0].name);

      setValue(json[0].name);
    } catch (e) {
      console.log(e);
    }
  }

  const [value, setValue] = useState(''); // Para guardar el dato a buscar
  const [weatherInfo, setWeatherInfo] = useState([]); // Para guardar los weatherInfo

  useEffect(() => {
    getUserLocation();
  }, []); // Run once on mount

  // equivale a un componentDidUpdate()
  useEffect(() => {
    async function fetchData() {
      if (value) {
        try {
          // Petición HTTP
          const res = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${value}&appid=${weatherApiKey}`);
          console.log(res);
          const json = res.data.list;
          // console.log(json);

          // Guarda en el array de weatherInfo el resultado. Procesa los datos
          setWeatherInfo(json.map(c => c));
        } catch (e) {
          setWeatherInfo([]) // No pintes nada 
        }
      }
    }
    fetchData();
  }, [value]); // componentDidUpdate


  const handleSubmit = e => {
    e.preventDefault();
    console.log(e.target.city.value)
    setValue(e.target.city.value) // Modificando el estado de Value
  };

  const renderWeather = () => {
    return weatherInfo.map((item, i) => <WeatherCard
      key={uuidv4()}
      dataCard={item}
      dataClouds={item.clouds}
      dataMain={item.main}
      dataWeather={item.weather[0]}
      dataWind={item.wind}
    />
    )
  }

  return (
    <>
      <section id="section-form">
        <form onSubmit={handleSubmit} id="city-form">
          {/* <label htmlFor="city">City: </label> */}
          <input name="city" type="text" placeholder="Write a city..." />
        </form>
        <h2>Weather from {value}</h2>
        {/* <button onClick={getUserLocation}>My Position</button> */}
      </section>
      <section id="section-cards">
        {weatherInfo.length != 0 ? renderWeather() : <p>Cargando...</p>}
      </section>
    </>
  )

};

export default WeatherList;