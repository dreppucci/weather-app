import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createLogger from 'redux-logger';
import weatherApp from './reducers';

const logger = createLogger();

export default function configureStore(preloadedState) {
  return createStore(
    weatherApp,
    applyMiddleware(thunk, promise, logger)
  );
};