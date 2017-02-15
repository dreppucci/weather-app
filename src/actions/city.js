import fetch from 'isomorphic-fetch';
import settings from '../settings/keys.json';
import { locale } from './../index.js';

export const UPDATE_CITY = 'UPDATE_CITY';
export const GEOLOCATING_CITY = 'GEOLOCATING_CITY';
export const FETCHING_CITY = 'FETCHING_CITY';
export const RECOVER_CITY = 'RECOVER_CITY';
export const RECOVER_CITY_ERROR = 'RECOVER_CITY_ERROR';
export const DENIED_GEOLOCATION = 'DENIED_GEOLOCATION';
export const CITY_UNKNOWN = 'CITY_UNKNOWN';
export const REMOVE_CITY = 'REMOVE_CITY';

export var printCity = function(city, country, lat, lng) {
  return {
    type: UPDATE_CITY,
    city: city,
    country: country,
    lat: lat,
    lng: lng,
    receivedAt: Date.now(),
    message: locale.SearchFormFetchingCityDataOk,
    status: 200
  };
};

var recoverCity = function(lat, lng, json) {
  return {
    type: RECOVER_CITY,
    city: json.results[2].address_components[0].short_name,
    country: json.results[2].address_components[4].short_name,
    lat: lat,
    lng: lng,
    receivedAt: Date.now(),
    message: locale.SearchFormFetchingCityDataOk,
    status: 200
  };
};

var recoverCityError = function(error) {
  return {
    type: RECOVER_CITY_ERROR,
    message: error,
    status: 400
  };
};

export var cityUpdateStatus = function(type) {
  return {
    type: type,
    status: 200
  };
};

export var cityError = function(error, message) {
  return {
    type: error,
    message: message,
    status: 400
  };
};

export var fetchCity = function(lat, lng) {
  return (dispatch, getState) => {
    return fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${settings.GoogleMaps}`)
      .then(response => response.json() )
      .then(json => dispatch(recoverCity(lat, lng, json)))
      .catch(error => dispatch(recoverCityError(error)));
  };
};

export var removeCity = function() {
  return {
    type: REMOVE_CITY,
    status: 200
  };
};