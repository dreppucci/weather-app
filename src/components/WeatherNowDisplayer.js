import React, { PropTypes } from 'react';
import { locale } from './../index.js';

const WeatherNowDisplayer = ({ data, message, status }) => {
  let weather = data ? {
    description: data.weather,
    icon: data.icon_url,
    humidity: data.relative_humidity,
    temp: data.temp_c,
    wind: data.wind_kph
  } : 'empty';

  return (
    <div className={data ? 'is-visible' : 'is-hidden' }>
      <ul>
        <li>Main</li>
        <li>Daily</li>
        <li>Hourly</li>
      </ul>
      <h3>{locale.WeatherNow}</h3>
      <figure>
        <img src={weather.icon} alt="" title="" />
      </figure>
      Temp: {weather.temp}°C
      Desc: {weather.description}
      Humidity: {weather.humidity}
      Wind: {weather.wind}km/h
    </div>
  );
};

WeatherNowDisplayer.PropTypes = {
  data: PropTypes.object.isRequired,
  message: PropTypes.string.isRequired,
  status: PropTypes.number.isRequired
};

export default WeatherNowDisplayer;