import React, { PropTypes } from 'react';
import { locale } from './../index.js';

const WeatherNowDisplayer = ({ data, type, message, status }) => {
  let currentWeather = <span>empty</span>;

  try {
    currentWeather = data && type === 'current' ? (
      <div>
        <h4>{data.display_location.full}</h4>
        <h5>{data.observation_time}</h5>
        <h6>{data.weather}</h6>
        <figure>
          <img src={data.icon_url} alt="" title="" />
        </figure>
        <ul>
          <li>{locale.Temperature}: {data.relative_humidity}°C</li>
          <li>{locale.Humidity}: {data.temp_c}</li>
          <li>{locale.Wind}: {data.wind_kph}km/h</li>
        </ul>
      </div>
    ) : <span>empty</span>;
  }
  catch(error) {
    console.log(error);
    currentWeather = <span>empty</span>;
  }

  return (
    <div className={data ? 'weather-forecast__now is-visible' : 'weather-forecast__now is-hidden' }>
      <h3>{locale.Now}</h3>
      {currentWeather}
    </div>
  );
};

WeatherNowDisplayer.PropTypes = {
  data: PropTypes.object.isRequired,
  message: PropTypes.string.isRequired,
  status: PropTypes.number.isRequired
};

export default WeatherNowDisplayer;