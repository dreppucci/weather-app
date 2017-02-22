import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import WeatherForecast from './../components/WeatherForecast.js';
import weatherApp from './../reducers/';
import cityReducer from './../reducers/cityReducer';
import { weatherTypeReducer, weatherReducer } from './../reducers/weatherReducer';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('WeatherForecast', () => {
  let WeatherForecastComponent;
  const store = mockStore({cityReducer, weatherTypeReducer, weatherReducer});

  beforeEach(() => {
    WeatherForecastComponent = shallow(<WeatherForecast store={store} />);
  });

  it('renders nested components', () => {
    //expect(WeatherForecastComponent.find('WeatherForecastType').length).toEqual(1);
    //store.getState().weatherTypeReducer.tab == 'current' ? expect(WeatherForecastComponent.find('WeatherNow').length).toEqual(1) : expect(WeatherForecastComponent.find('WeatherNext').length).toEqual(1);
  });
});