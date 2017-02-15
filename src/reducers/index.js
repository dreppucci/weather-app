import { combineReducers } from 'redux';
import cityReducer from './cityReducer';
import { weatherTypeReducer, weatherReducer } from './weatherReducer';

const weatherApp = combineReducers({
  cityReducer,
  weatherTypeReducer,
  weatherReducer
});

export default weatherApp;