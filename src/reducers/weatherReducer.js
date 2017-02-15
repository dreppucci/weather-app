import { locale } from './../index.js';

export var weatherTypeReducer = function(state = { 'type': 'UPDATING_TYPE', 'tab': 'current' }, action) {
  switch (action.type) {
    case 'UPDATING_TYPE':
      return {
        type: action.type,
        tab: action.tab
      };
    default:
      return state;
  }
};

export var weatherReducer = function(state = [], action) {

  switch (action.type) {
    case 'FETCHING_WEATHER':
      return {
        city: action.city,
        country: action.country,
        lat: action.lat,
        lng: action.lng,
        receivedAt: action.receivedAt,
        message: action.WeatherFetchingData
      };
    case 'FETCHING_WEATHER_ERROR':
      return {
        receivedAt: action.receivedAt,
        message: action.message
      };
    case 'UPDATING_WEATHER':
      return {
        data: action.data,
        receivedAt: action.receivedAt,
        message: locale.WeatherUpdatingData
      };
    case 'UPDATED_WEATHER':
      return {
        data: action.data,
        receivedAt: action.receivedAt,
        message: locale.WeatherUpdatedData
      };
    default:
      return state;
  }
};