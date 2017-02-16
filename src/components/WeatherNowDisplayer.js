import React, { PropTypes } from 'react';
import { locale } from './../index.js';

const WeatherNowDisplayer = ({ data, type, message, status }) => {
  let currentWeather = <span className="feedback">{locale.Loading}</span>;

  try {
    currentWeather = data && type === 'current' ? (
      <div className="weather-forecast__cell">
        <div className="weather-forecast__day-infos">
          <h5>{locale.Today}</h5>
          <h6>{data.weather}</h6>
        </div>
        <div className="weather-forecast__day-values">
          <figure>
            <img src={data.icon_url} alt="" title="" />
          </figure>
          <ul>
            <li><strong>{locale.Temperature}</strong> {data.temp_c}°C</li>
            <li><strong>{locale.Humidity}</strong> {data.relative_humidity}</li>
            <li><strong>{locale.Wind}</strong> {data.wind_kph}km/h</li>
          </ul>
        </div>
      </div>
    ) : <span className="feedback feedback--error">{locale.LoadingError}</span>;
  }
  catch(error) {
    console.log(error);
    currentWeather = <span className="feedback feedback--error">{locale.LoadingError}</span>;
  }

  return (
    <div className="weather-forecast__content weather-forecast__now">
      <div className="weather-forecast__cell-wrapper">
        {currentWeather}
      </div>
    </div>
  );
};

WeatherNowDisplayer.PropTypes = {
  data: PropTypes.object.isRequired,
  message: PropTypes.string.isRequired,
  status: PropTypes.number.isRequired
};

export default WeatherNowDisplayer;