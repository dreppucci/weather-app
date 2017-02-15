import React, { PropTypes } from 'react';
import { locale } from './../index.js';

const WeatherNextDisplayer = ({ data, type, message, status }) => {
  let weatherDays = <span>empty</span>,
    weatherForecastDays;

  try {
    weatherDays = data && type === 'forecast' ? data.simpleforecast.forecastday : <span>empty</span>;

    weatherForecastDays = weatherDays.map((day, index) => {
      return (
        <div className="weather-forecast__row" key={index}>
          <h5>{day.date.weekday}</h5>
          <h6>{day.conditions}</h6>
          <figure>
            <img src={day.icon_url} alt="" title="" />
          </figure>
          <ul>
            <li>{locale.HighestTemperature}: {day.high.celsius}°C</li>
            <li>{locale.LowestTemperature}: {day.low.celsius}°C</li>
            <li>{locale.Humidity}: {day.avehumidity}</li>
            <li>{locale.Wind}: {day.avewind.kph}km/h</li>
          </ul>
        </div>
      );
    });
  }
  catch(error) {
    console.log(error);
    weatherDays = <span>empty</span>;
  }

  return (
    <div className={data ? 'weather-forecast__next is-visible' : 'weather-forecast__next is-hidden' }>
      <h3>{locale.WeatherForecast}</h3>
      {weatherForecastDays}
    </div>
  );
};

WeatherNextDisplayer.PropTypes = {
  data: PropTypes.object.isRequired,
  message: PropTypes.string.isRequired,
  status: PropTypes.number.isRequired
};

export default WeatherNextDisplayer;