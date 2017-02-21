import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './configureStore';
import App from './App';
import renderer from 'react-test-renderer';

const store = configureStore();

it('renders without crashing', () => {
  const component = renderer.create(<App store={store}/>);
});