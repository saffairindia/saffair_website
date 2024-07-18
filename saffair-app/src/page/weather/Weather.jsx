import { Oval } from 'react-loader-spinner';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrown } from '@fortawesome/free-solid-svg-icons';
import './weather.css';
import WeatherForecast from '../../component/weatherforcast/WeatherForecast';
// import { useSearch } from '../context/SearchContext'
import { useContext } from 'react';
import { SearchContext } from '../Home';
import { cityContext } from '../Home';

function Weather() {
  const { newCity, setNewCity } = useContext(SearchContext)
  const { location, setLocation } = useContext(cityContext)
  // console.log(newCity);
  const [input, setInput] = useState(location);
  const [weather, setWeather] = useState({
    loading: false,
    data: {},
    error: false,
  });

  const toDateFunction = () => {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const WeekDays = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const currentDate = new Date();
    const date = `${WeekDays[currentDate.getDay()]} ${currentDate.getDate()} ${months[currentDate.getMonth()]}`;
    return date;
  };

  useEffect(() => {
    setWeather({ ...weather, loading: true });
    const url = 'https://api.openweathermap.org/data/2.5/weather';
    const api_key = '5162096789da4a96c75f4792c5e4628e';
    axios
      .get(url, {
        params: {
          q: location,
          units: 'metric',
          appid: api_key,
        },
      })
      .then((res) => {
        // console.log('res', res);
        setWeather({ data: res.data, loading: false, error: false });
      })
      .catch((error) => {
        setWeather({ ...weather, data: {}, error: true });
        setInput('');
        // console.log('error', error);
      });
  }, [location])

  const search = async (e) => {
    e.preventDefault();
    setNewCity(input);

    setWeather({ ...weather, loading: true });
    const url = 'https://api.openweathermap.org/data/2.5/weather';
    const api_key = '5162096789da4a96c75f4792c5e4628e';
    axios
      .get(url, {
        params: {
          q: input,
          units: 'metric',
          appid: api_key,
        },
      })
      .then((res) => {
        // console.log('res', res);
        setWeather({ data: res.data, loading: false, error: false });
      })
      .catch((error) => {
        setWeather({ ...weather, data: {}, error: true });
        setInput('');
        // console.log('error', error);
      });
  };



  return (
    <>
      <div className="container">
        <div className="searchbarContainer">
          <h1 className="app-name">Explore Weather of Your city</h1>
          <div className="search-bar">
            <input
              type="text"
              className="city-search"
              placeholder="Enter City Name.."
              name="query"
              value={input}
              onChange={(event) => setInput(event.target.value)}
            />
          </div>
          <button onClick={search} className='s-btn'>Search</button>
        </div>
        <div className="weatherContainer">
          {weather.loading && (
            <>
              <br />
              <br />
              <Oval type="Oval" color="black" height={100} width={100} />
            </>
          )}
          {weather.error && (
            <>
              <br />
              <br />
              <span className="error-message">
                <FontAwesomeIcon icon={faFrown} />
                <span style={{ fontSize: '20px' }}>City not found</span>
              </span>
            </>
          )}
          {weather && weather.data && weather.data.main && (
            <div>
              <div className="city-name">
                <h2>
                  {weather.data.name},<span>{weather.data.sys.country}</span>
                </h2>
              </div>
              <div className="date">
                <span>{toDateFunction()}</span>
              </div>
              <div className="icon-temp">
                <img
                  className=""
                  src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`}
                  alt={weather.data.weather[0].description}
                />
                {Math.round(weather.data.main.temp)}
                <sup className="deg">°C</sup>
              </div>
              <div className="des-wind">
                <p>{weather.data.weather[0].description.toUpperCase()}</p>
                <p>Wind Speed: {weather.data.wind.speed}m/s</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <WeatherForecast />
    </>
  );
}

export default Weather;
