import fetch from 'isomorphic-fetch';
import settings from './../settings/keys.json';
import { getGoogleMapsPlaceInfo } from './../containers/GoogleMapPlace';

export const UPDATE_CITY = 'UPDATE_CITY';
export const GEOLOCATING_CITY = 'GEOLOCATING_CITY';
export const FETCHING_CITY = 'FETCHING_CITY';
export const RECOVER_CITY = 'RECOVER_CITY';
export const RECOVER_CITY_ERROR = 'RECOVER_CITY_ERROR';
export const DENIED_GEOLOCATION = 'DENIED_GEOLOCATION';
export const CITY_UNKNOWN = 'CITY_UNKNOWN';
export const REMOVE_CITY = 'REMOVE_CITY';

const __LANG = navigator.language !== 'en-US' ? 'en-US' : navigator.language;
const locale = require('./../locale/' + __LANG + '.json');

export let print = function(city, state, country, lat, lng) {
  return {
    type: UPDATE_CITY,
    city: city,
    state: state,
    country: country,
    lat: lat,
    lng: lng,
    receivedAt: Date.now(),
    message: locale.SearchFormFetchingCityDataOk,
    status: 200
  };
};

let recover = function(lat, lng, json) {
  return {
    type: RECOVER_CITY,
    city: getGoogleMapsPlaceInfo(json.results[2], 'locality'),
    state: [ getGoogleMapsPlaceInfo(json.results[2], 'administrative_area_level_1', 'short_name'), getGoogleMapsPlaceInfo(json.results[2], 'administrative_area_level_1', 'long_name')],
    country: getGoogleMapsPlaceInfo(json.results[2], 'country'),
    lat: lat,
    lng: lng,
    receivedAt: Date.now(),
    message: locale.SearchFormFetchingCityDataOk,
    status: 200
  };
};

let recoverError = function(error) {
  return {
    type: RECOVER_CITY_ERROR,
    message: error,
    status: 400
  };
};

export let updateStatus = function(type) {
  return {
    type: type,
    status: 200
  };
};

export let get = function(lat, lng) {
  return (dispatch, getState) => {
    return fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${settings.GoogleMaps}`)
      .then(response => response.json() )
      .then(json => dispatch(recover(lat, lng, json)))
      .catch(error => dispatch(recoverError(error)));
  };
};

export let remove = function() {
  return {
    type: REMOVE_CITY,
    status: 200
  };
};