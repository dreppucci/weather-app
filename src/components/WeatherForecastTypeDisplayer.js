import React, { PropTypes } from 'react';
import { locale } from './../index.js';

const WeatherForecastTypeDisplayer = ({ onClick, tab }) => {
  return (
    <div className="weather-forecast__tab">
      <ul>
        <li><a href="#" className={tab == 'current' ? 'is-active' : ''} title={locale.Now} onClick={e => {
         e.preventDefault();
         onClick('current');
       }}>{locale.Now}</a></li>
        <li><a href="#" className={tab == 'forecast' ? 'is-active' : ''} title={locale.WeatherForecast} onClick={e => {
         e.preventDefault();
         onClick('forecast');
       }}>{locale.WeatherForecast}</a></li>
      </ul>
    </div>
  );
};

WeatherForecastTypeDisplayer.PropTypes = {
  onClick: PropTypes.func.isRequired
};

export default WeatherForecastTypeDisplayer;