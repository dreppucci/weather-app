import React, { PropTypes } from 'react';

import { fetchWeatherNow } from '../actions/weather';

import WeatherForecastType from './../containers/WeatherForecastType';
import WeatherNow from './../containers/WeatherNow';
import WeatherNext from './../containers/WeatherNext';

const __LANG = navigator.language !== 'en-US' ? 'en-US' : navigator.language;
const locale = require('./../locale/' + __LANG + '.json');

class WeatherForecast extends React.Component {

  componentDidMount() {
    const { store } = this.props;
  }

  render() {
    const props = this.props;
    const { store } = props;

    return (
      <div className="weather-forecast">
        <WeatherForecastType />
        {store.getState().weatherTypeReducer.tab == 'current' ? <WeatherNow store={store} /> : <WeatherNext store={store} />}
      </div>
    );
  }
};

export default WeatherForecast;