import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import App from './../App.js';

describe('App', () => {
  let AppComponent;

  beforeEach(() => {
    AppComponent = shallow(<App />);
  });

  it('renders nested components', () => {
    expect(AppComponent.find('Header').length).toEqual(1);
    expect(AppComponent.find('SearchForm').length).toEqual(1);
    AppComponent.instance().state.weatherDisplay ? expect(AppComponent.find('WeatherForecast').length).toEqual(1) : expect(AppComponent.find('WeatherForecast').length).toEqual(0);
  });
});