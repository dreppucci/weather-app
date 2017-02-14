import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './configureStore';

import attachFastClick from 'fastclick';

import App from './App';

const __LANG = navigator.language !== 'en-US' ? 'en-US' : navigator.language;
const locale = require('./locale/' + __LANG + '.json');

const store = configureStore();
attachFastClick.attach(document.body);

export {
  locale,
  store
};

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
