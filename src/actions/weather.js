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

export let updateType = function(tab) {
  return {
    type: UPDATING_TYPE,
    tab: tab
  };
};

export let getNow = function(country, state, city, lat, lng) {
  return (dispatch, getState) => {
    return fetch(`http://api.wunderground.com/api/${settings.Wunderground}/conditions/q/${lat},${lng}.json`)
      .then(response => response.json() )
      .then(json => dispatch(update(json.current_observation)))
      .catch(error => dispatch(getError(error)));
  };
};

export let getNext = function(country, state, city, lat, lng) {
  return (dispatch, getState) => {
    return fetch(`http://api.wunderground.com/api/${settings.Wunderground}/forecast10day/q/${lat},${lng}.json`)
      .then(response => response.json() )
      .then(json => dispatch(update(json.forecast)))
      .catch(error => dispatch(getError(error)));
  };
};

let update = function(json) {
  return {
    type: UPDATED_WEATHER,
    data: json,
    receivedAt: Date.now(),
    message: locale.WeatherUpdatedData,
    status: 200
  };
};

let getError = function(error) {
  return {
    type: FETCHING_WEATHER_ERROR,
    receivedAt: Date.now(),
    message: error,
    status: 400
  };
};

let empty = function() {
  return {
    type: UPDATED_WEATHER,
    data: undefined,
    receivedAt: Date.now(),
    message: locale.WeatherEmptyData,
    status: 200
  };
};