import { combineReducers } from 'redux';
import cityReducer from './cityReducer';
import weatherReducer from './weatherReducer';

const weatherApp = combineReducers({
  cityReducer,
  weatherReducer
});

export default weatherApp;