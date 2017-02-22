import React from 'react';
import GoogleMap from './../components/GoogleMap';
import { fetchCity, printCity, cityError, cityUpdateStatus, removeCity } from './../actions/city';
import expect from 'expect';
import { mount } from 'enzyme';

describe('GoogleMap', () => {
  let component, requestGeoPosition;

  const geoPosition = {
    city: 'Milan',
    country: 'IT',
    lat: 45.4448551,
    lng: 9.1521257,
    message: 'Fetched',
    receivedAt: 1487693564971,
    state: [ 'Lombardy', 'Lombardy' ],
    status: 200,
    type: 'RECOVER_CITY'
  };

  beforeEach( () => {
    requestGeoPosition = expect.createSpy();
    component = mount(<GoogleMap onRequestGeoPosition={requestGeoPosition} />);
  });

  it('Focus input changes className', () => {
    const input = component.find('#city');
    input.simulate('focus');
    input.simulate('change', { target: { value: 'Miami' } });
    input.simulate('keyDown', {
      which: 27,
      target: {
        blur() {
          input.simulate('blur');
        },
      },
    });
    expect(input.get(0).className).toBe('is-valued');
  });

  it('Search input calls Google Maps Api', () => {
    const input = component.find('#city');
    input.simulate('focus');
    input.simulate('change', { target: { value: 'Miami' } });
    input.simulate('keyDown', {
      which: 27,
      target: {
        blur() {
          input.simulate('blur');
        },
      },
    });
    expect(input.get(0).value).toBe('Miami');
  });

  pit('Request geolocation', () => {
    const navigator = require('./../__mocks__/geolocation.js');

    const button = component.find('.search-form__geo-button');
    button.simulate('click');
    const currentGeoPosition = navigator.default.geolocation.getCurrentPosition();
    expect(currentGeoPosition.coords.latitude).toEqual(geoPosition.lat);
    expect(currentGeoPosition.coords.longitude).toEqual(geoPosition.lng);
  });
});