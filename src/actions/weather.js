import fetch from 'isomorphic-fetch';
import settings from '../settings/keys.json';

export const UPDATING_TYPE = 'UPDATING_TYPE';
export const FETCHING_WEATHER = 'FETCHING_WEATHER';
export const FETCHING_WEATHER_ERROR = 'FETCHING_WEATHER_ERROR';
export const UPDATING_WEATHER = 'UPDATING_WEATHER';
export const UPDATED_WEATHER = 'UPDATED_WEATHER';
export const EMPTY_WEATHER = 'EMPTY_WEATHER';

const __LANG = navigator.language !== 'en-US' ? 'en-US' : navigator.language;
const locale = require('./../locale/' + __LANG + '.json');

export let updateWeatherType = function(tab) {
  return {
    type: UPDATING_TYPE,
    tab: tab
  };
};

export let fetchWeatherNow = function(country, state, city, lat, lng) {
  return (dispatch, getState) => {
    let trimmedCity = city.trim().replace(/ /ig, ''),
      shortState = state[0] !== state[1] ? '/'+state[0] : '';
    return fetch(`http://api.wunderground.com/api/${settings.Wunderground}/conditions/q/${country}${shortState}/${trimmedCity}.json`)
      .then(response => response.json() )
      .then(json => dispatch(updateWeather(json.current_observation)))
      .catch(error => dispatch(fetchingWeatherError(error)));
  };
};

export let fetchWeatherNext = function(country, state, city, lat, lng) {
  return (dispatch, getState) => {
    let trimmedCity = city.trim().replace(/ /ig, ''),
      shortState = state[0] !== state[1] ? '/'+state[0] : '';
    return fetch(`http://api.wunderground.com/api/${settings.Wunderground}/forecast10day/q/${country}${shortState}/${trimmedCity}.json`)
      .then(response => response.json() )
      .then(json => dispatch(updateWeather(json.forecast)))
      .catch(error => dispatch(fetchingWeatherError(error)));
  };
};

let updateWeather = function(json) {
  return {
    type: UPDATED_WEATHER,
    data: json,
    receivedAt: Date.now(),
    message: locale.WeatherUpdatedData,
    status: 200
  };
};

let fetchingWeatherError = function(error) {
  return {
    type: FETCHING_WEATHER_ERROR,
    receivedAt: Date.now(),
    message: error,
    status: 400
  };
};

let emptyWeather = function() {
  return {
    type: UPDATED_WEATHER,
    data: undefined,
    receivedAt: Date.now(),
    message: locale.WeatherEmptyData,
    status: 200
  };
};