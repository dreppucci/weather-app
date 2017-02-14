import React, { PropTypes } from 'react';

import { locale, store } from './../index.js';
import { fetchWeather } from '../actions/weather';

import WeatherNow from './../containers/WeatherNow';

class WeatherForecast extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    function select(state, value) {
      return state.cityReducer[value];
    };

    let currentLat, currentLng, currentCountry, currentCity;

    var handleChange = function() {
      let previousLat = currentLat,
        previousLng = currentLng,
        previousCountry = currentCountry,
        previousCity = currentCity;

      currentCountry = select(store.getState(), 'country');
      currentCity = select(store.getState(), 'city');

      if (previousCountry !== currentCountry && previousCity !== currentCity) {
        store.dispatch(
          fetchWeather(
            currentCountry,
            currentCity
          )
        ).then( (state) => {
          console.log(state);
        });
      };
    };

    store.subscribe(handleChange);
  }

  render() {
    return (
      <div className="weather-forecast">
        <WeatherNow />
      </div>
    );
  }
};

export default WeatherForecast;