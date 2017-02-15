import fetch from 'isomorphic-fetch';
import settings from '../settings/keys.json';
import { locale } from './../index.js';

export const UPDATING_TYPE = 'UPDATING_TYPE';
export const FETCHING_WEATHER = 'FETCHING_WEATHER';
export const FETCHING_WEATHER_ERROR = 'FETCHING_WEATHER_ERROR';
export const UPDATING_WEATHER = 'UPDATING_WEATHER';
export const UPDATED_WEATHER = 'UPDATED_WEATHER';
export const EMPTY_WEATHER = 'EMPTY_WEATHER';

export var updateWeatherType = function(tab) {
  return {
    type: UPDATING_TYPE,
    tab: tab
  };
};

export var fetchWeatherNow = function(country, city, lat, lng) {
  return (dispatch, getState) => {
    return fetch(`http://api.wunderground.com/api/${settings.Wunderground}/conditions/q/${country}/${city}.json`)
      .then(response => response.json() )
      .then(json => dispatch(updateWeather(json.current_observation)))
      .catch(error => dispatch(fetchingWeatherError(error)));
  };
};

export var fetchWeatherNext = function(country, city, lat, lng) {
  return (dispatch, getState) => {
    return fetch(`http://api.wunderground.com/api/${settings.Wunderground}/forecast10day/q/${country}/${city}.json`)
      .then(response => response.json() )
      .then(json => dispatch(updateWeather(json.forecast)))
      .catch(error => dispatch(fetchingWeatherError(error)));
  };
};

var updateWeather = function(json) {
  return {
    type: UPDATED_WEATHER,
    data: json,
    receivedAt: Date.now(),
    message: locale.WeatherUpdatedData,
    status: 200
  };
};

var fetchingWeatherError = function(error) {
  return {
    type: FETCHING_WEATHER_ERROR,
    receivedAt: Date.now(),
    message: error,
    status: 400
  };
};

var emptyWeather = function() {
  return {
    type: UPDATED_WEATHER,
    data: undefined,
    receivedAt: Date.now(),
    message: locale.WeatherEmptyData,
    status: 200
  };
};