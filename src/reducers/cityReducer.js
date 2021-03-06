const __LANG = navigator.language !== 'en-US' ? 'en-US' : navigator.language;
const locale = require('./../locale/' + __LANG + '.json');

var cityReducer = function(state = [], action) {

  switch (action.type) {
    case 'UPDATE_CITY':
      return {
        city: action.city,
        state: action.state,
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
        state: action.state,
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
        state: undefined,
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