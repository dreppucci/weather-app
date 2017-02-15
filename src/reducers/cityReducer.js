import { locale } from './../index.js';

var cityReducer = function(state = [], action) {

  switch (action.type) {
    case 'UPDATE_CITY':
      return {
        city: action.city,
        country: action.country,
        lat: action.lat,
        lng: action.lng,
        receivedAt: action.receivedAt,
        message: action.message,
        status: action.status
      };
    case 'RECOVER_CITY':
      return {
        city: action.city,
        country: action.country,
        lat: action.lat,
        lng: action.lng,
        receivedAt: action.receivedAt,
        message: action.message,
        status: action.status
      };
    case 'GEOLOCATING_CITY':
      return {
        receivedAt: action.receivedAt,
        message: locale.SearchFormGeolocalizing,
        status: action.status
      };
    case 'FETCHING_CITY':
      return {
        receivedAt: action.receivedAt,
        message: locale.SearchFormFetchingCityData,
        status: action.status
      };
    case 'DENIED_GEOLOCATION':
      return {
        receivedAt: action.receivedAt,
        message: locale.SearchFormGeolocationDenied,
        status: action.status
      };
    case 'CITY_UNKNOWN':
      return {
        receivedAt: action.receivedAt,
        message: locale.SearchFormCityUnknown,
        status: action.status
      };
    case 'REMOVE_CITY':
      return {
        city: undefined,
        country: undefined,
        lat: undefined,
        lng: undefined,
        message: locale.SearchFormCityUnknown,
        status: action.status
      };
    default:
      return state;
  }
};

export default cityReducer;