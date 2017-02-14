import React, { PropTypes } from 'react';
import { locale } from './../index.js';

const WeatherNowDisplayer = ({ data, message, status }) => {
  let weather = data ? {
    location: data.display_location.full,
    latest_updated: data.observation_time,
    description: data.weather,
    icon: data.icon_url,
    humidity: data.relative_humidity,
    temp: data.temp_c,
    wind: data.wind_kph
  } : 'empty';

  return (
    <div className={data ? 'is-visible' : 'is-hidden' }>
      <ul>
        <li>{locale.Current}</li>
        <li>5 {locale.WeatherForecast}</li>
      </ul>
      <h3>{locale.Now}</h3>
      <h4>{weather.location}</h4>
      <h5>{weather.latest_updated}</h5>
      <h6>{weather.description}</h6>
      <figure>
        <img src={weather.icon} alt="" title="" />
      </figure>
      {locale.Temperature}: {weather.temp}°C
      {locale.Humidity}: {weather.humidity}
      {locale.Wind}: {weather.wind}km/h
    </div>
  );
};

WeatherNowDisplayer.PropTypes = {
  data: PropTypes.object.isRequired,
  message: PropTypes.string.isRequired,
  status: PropTypes.number.isRequired
};

export default WeatherNowDisplayer;