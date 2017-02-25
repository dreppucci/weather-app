import React, { PropTypes } from 'react';
const __LANG = navigator.language !== 'en-US' ? 'en-US' : navigator.language;
const locale = require('./../locale/' + __LANG + '.json');

const WeatherNowDisplayer = ({ data, type, message, status }) => {
  let currentWeather = <span className="feedback">{locale.Loading}</span>;

  try {
    let image = window.location.protocol === 'http:' ? data.icon_url : data.icon_url.replace('http', 'https');
    currentWeather = data && type === 'current' ? (
      <div className="weather-forecast__cell">
        <div className="weather-forecast__day-infos">
          <h5>{locale.Today}</h5>
          <h6>{data.weather}</h6>
        </div>
        <div className="weather-forecast__day-values">
          <figure>
            <img src={image} alt="" title="" />
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