import React, { PropTypes } from 'react';
const __LANG = navigator.language !== 'en-US' ? 'en-US' : navigator.language;
const locale = require('./../locale/' + __LANG + '.json');

const WeatherNextDisplayer = ({ data, type, message, status }) => {
  let weatherDays = <span className="feedback">{locale.Loading}</span>,
    weatherForecastDays;

  try {
    weatherDays = data && type === 'forecast' ? data.simpleforecast.forecastday : <span>empty</span>;

    weatherForecastDays = weatherDays.map((day, index) => {
      let image = window.location.protocol === 'http:' ? day.icon_url : day.icon_url.replace('http', 'https');
      return (
        <div className="weather-forecast__cell" key={index}>
          <div className="weather-forecast__day-infos">
            <h5>{day.date.weekday},<span>{day.date.day} {day.date.monthname}</span></h5>
            <h6>{day.conditions}</h6>
          </div>
          <div className="weather-forecast__day-values" key={index}>
            <figure>
              <img src={image} alt="" title="" />
            </figure>
            <ul>
              <li><strong>{locale.HighestTemperature}</strong> {day.high.celsius}°C</li>
              <li><strong>{locale.LowestTemperature}</strong> {day.low.celsius}°C</li>
              <li><strong>{locale.Humidity}</strong> {day.avehumidity}%</li>
              <li><strong>{locale.AverageWind}</strong> {day.avewind.kph}km/h</li>
            </ul>
          </div>
        </div>
      );
    });
  }
  catch(error) {
    console.log(error);
    weatherDays = <span className="feedback feedback--error">{locale.LoadingError}</span>;
  }

  return (
    <div className="weather-forecast__content weather-forecast__next">
      <div className="weather-forecast__cell-wrapper">
        {weatherForecastDays}
      </div>
    </div>
  );
};

WeatherNextDisplayer.PropTypes = {
  data: PropTypes.object.isRequired,
  message: PropTypes.string.isRequired,
  status: PropTypes.number.isRequired
};

export default WeatherNextDisplayer;